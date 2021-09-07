import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
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
  const getOwner = (id: number): Owner =>
    owners.find((o) => o.id === id) ?? { id: 0, address: '', ens: null }

  if (!students) {
    return null
  }

  return (
    <div className="container mx-auto space-y-4 md:space-y-8">
      <div className="flex justify-center">
        <Image src="/bca.png" alt="BCA" width={302 / 2} height={277 / 2} />
      </div>
      <h1 className="text-3xl text-center font-bold">Blockchain Gakuen Loot</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {students.map((student) => (
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
