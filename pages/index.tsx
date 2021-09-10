import { XCircleIcon } from '@heroicons/react/solid'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import StudentCard from '../components/StudentCard'
import { getOwners } from '../lib/getOwners'
import { getStudents } from '../lib/getStudents'
import { Owner } from '../types/Owner'
import { Student } from '../types/Student'

const ONE_DAY_BY_SECONDS = 60 * 60 * 24

export const getStaticProps: GetStaticProps = async () => {
  const [students, owners] = await Promise.all([getStudents(), getOwners()])
  console.log(owners)
  return { props: { students, owners }, revalidate: ONE_DAY_BY_SECONDS }
}

const HomePage: NextPage<{ students: Student[]; owners: Owner[] }> = ({
  students,
  owners,
}) => {
  const router = useRouter()

  const [listTitle, setListTitle] = useState<string>('Students')

  const { class: className, guild, club, talent } = router.query

  const shownStudents: Student[] = useMemo(() => {
    if (className) {
      setListTitle(`Students of ${className}`)
      return students.filter((s) => s.className === className)
    }
    if (guild) {
      setListTitle(`Students of ${guild}`)
      return students.filter((s) => s.guild === guild)
    }
    if (club) {
      setListTitle(`Students of ${club}`)
      return students.filter((s) => s.club === club)
    }
    if (talent) {
      setListTitle(`Students of ${talent}`)
      return students.filter((s) => s.talent === talent)
    }
    setListTitle('Students')
    return students
  }, [students, className, guild, club, talent])

  if (!students) {
    return null
  }

  const getOwner = (id: number): Owner =>
    owners.find((o) => o.id === id) ?? {
      id: 0,
      address: '',
      ens: null,
      gCoinBalance: '0',
    }

  return (
    <div className="container mx-auto space-y-4 md:space-y-8">
      <h1 className="flex justify-center">
        <Image
          src="/bca.png"
          alt="Blockchain Gakuen"
          width={302 / 2}
          height={277 / 2}
        />
      </h1>
      <div className="flex items-center space-x-4 md:space-x-8">
        <div>
          <h2 className="text-3xl font-bold">{listTitle || 'Students'}</h2>
          {listTitle !== 'Students' && (
            <span className="text-gray-500">{`${shownStudents.length} Students`}</span>
          )}
        </div>
        {listTitle !== 'Students' && (
          <Link href="/">
            <a className="bg-gray-500 text-white text-sm py-1 px-4 rounded-2xl whitespace-nowrap flex items-center space-x-1">
              <XCircleIcon className="w-4 h-4" />
              <span>Reset</span>
            </a>
          </Link>
        )}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {shownStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            owner={getOwner(student.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage
