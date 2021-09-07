import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import StudentCard from '../components/StudentCard'
import { getOwners } from '../lib/getOwners'
import { getStudents } from '../lib/getStudents'
import { Owner } from '../types/Owner'
import { Student } from '../types/Student'

export const getStaticProps: GetStaticProps = async () => {
  const [students, owners] = await Promise.all([getStudents(), getOwners()])
  return { props: { students, owners } }
}

const HomePage: NextPage<{ students: Student[]; owners: Owner[] }> = ({
  students,
  owners,
}) => {
  const router = useRouter()

  const [listTitle, setListTitle] = useState<string>('Students')

  const shownStudents: Student[] = useMemo(() => {
    if (router.query.class) {
      setListTitle(`Students of ${router.query.class}`)
      return students.filter((s) => s.className === router.query.class)
    }
    if (router.query.guild) {
      setListTitle(`Students of ${router.query.guild}`)
      return students.filter((s) => s.guild === router.query.guild)
    }
    if (router.query.club) {
      setListTitle(`Students of ${router.query.club}`)
      return students.filter((s) => s.club === router.query.club)
    }
    if (router.query.talent) {
      setListTitle(`Students of ${router.query.talent}`)
      return students.filter((s) => s.talent === router.query.talent)
    }
    setListTitle('Students')
    return students
  }, [students, router.query.class, router.query.guild])

  if (!students) {
    return null
  }

  const getOwner = (id: number): Owner =>
    owners.find((o) => o.id === id) ?? { id: 0, address: '', ens: null }

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
      <div>
        <h2 className="text-3xl font-bold">{listTitle || 'Students'}</h2>
        {listTitle !== 'Students' && (
          <span className="text-gray-500">{`${shownStudents.length} Students`}</span>
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
