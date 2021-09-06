import cn from 'classnames'
import { JSDOM } from 'jsdom'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { FC } from 'react'

type Student = {
  id: number
  className: string
  name: string
  guild: string
  club: string
  talent: string
}

type StudentProps = {
  student: Student
}

const Student: FC<StudentProps> = ({ student }) => {
  // const [owner, setOwner] = useState<string>('')
  // const [lastName, setLastName] = useState<string>('')
  // const [firstName, setFirstName] = useState<string>('')

  // useEffect(() => {
  //   contract.ownerOf(tokenId).then(setOwner)
  //   contract.getLastName(tokenId).then(setLastName)
  //   contract.getFirstName(tokenId).then(setFirstName)
  // }, [contract, tokenId])

  const grade = Number(student.className.substr(0, 1))
  const id = `000${student.id}`.slice(-3)

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div
        className={cn('h-20 bg-gradient-to-r rounded-t-2xl -mt-4 -mx-4', {
          'from-purple-500 to-indigo-500': grade === 3,
          'from-green-400 to-cyan-500': grade === 2,
          'from-orange-400 to-pink-600': grade === 1,
        })}
      />
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto -mt-10">
        <Image
          src={`https://robohash.org/${encodeURIComponent(
            student.name
          )}?set=set4`}
          width={64}
          height={64}
          alt=""
        />
      </div>
      <div className="-mt-2">
        <p
          className={cn('font-bold text-lg', {
            'text-purple-500': grade === 3,
            'text-green-500': grade === 2,
            'text-orange-500': grade === 1,
          })}
        >
          {student.className}
        </p>
        <h3 className="font-bold text-2xl">{student.name}</h3>
        <p>{`Student ID: ${id}`}</p>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{student.guild}</p>
          <p className="text-sm text-gray-500">{student.club}</p>
          <p className="text-sm text-gray-500">{student.talent}</p>
        </div>
      </div>
    </div>
    // <tr>
    //   <td>{student.id}</td>
    //   <td>{student.className}</td>
    //   <td>{student.name}</td>
    //   <td>{student.guild}</td>
    //   <td>{student.club}</td>
    //   <td>{student.talent}</td>
    // </tr>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const svgs = await Promise.all(
    Array.from(Array(300).keys()).map((i) => {
      return fetch(
        `https://metadata.mch.plus/erc721/137/0x9dC9e20E35F7Af608C4e7233a95DB50bDF5f8F9e/${
          i + 1
        }/image`
      ).then((res) => res.text())
    })
  )
  const students = svgs
    .map((svg) => new JSDOM(svg))
    .map((dom, i) => {
      const className =
        dom.window.document.querySelector('text[y="20"]')?.textContent
      const name =
        dom.window.document.querySelector('text[y="40"]')?.textContent
      const guild =
        dom.window.document.querySelector('text[y="60"]')?.textContent
      const club =
        dom.window.document.querySelector('text[y="80"]')?.textContent
      const talent =
        dom.window.document.querySelector('text[y="100"]')?.textContent
      return { id: i + 1, className, name, guild, club, talent }
    })
  return { props: { students } }
}

const HomePage: NextPage<{ students: Student[] }> = ({ students }) => {
  // const [contract, setContract] = useState<ethers.Contract>()

  // useEffect(() => {
  //   ;(window as any).ethereum.enable().then(() => {
  //     const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  //     const contract = new ethers.Contract('0x9dC9e20E35F7Af608C4e7233a95DB50bDF5f8F9e', [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getClass","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getClub","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getFirstName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getGrade","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getGuild","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getLastName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTalent","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}], provider)
  //     setContract(contract)
  //   })
  // }, [])

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
          <Student key={student.id} student={student} />
        ))}
      </div>

      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Class</th>
            <th>Name</th>
            <th>Guild</th>
            <th>Club</th>
            <th>Talent</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <Row key={student.id} student={student} />
          ))}
        </tbody>
      </table> */}
    </div>
  )
}

export default HomePage
