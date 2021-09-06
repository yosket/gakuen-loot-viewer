import {GetStaticProps, NextPage} from 'next'
import {ethers} from 'ethers'
import { FC, useEffect, useState } from 'react'
import { JSDOM } from 'jsdom'

type Student = {
  id: number
  className: string
  name: string
  guild: string
  club: string
  talent: string
}

type RowProps = {
  student: Student
}

const Row: FC<RowProps> = ({ student }) => {
  // const [owner, setOwner] = useState<string>('')
  // const [lastName, setLastName] = useState<string>('')
  // const [firstName, setFirstName] = useState<string>('')

  // useEffect(() => {
  //   contract.ownerOf(tokenId).then(setOwner)
  //   contract.getLastName(tokenId).then(setLastName)
  //   contract.getFirstName(tokenId).then(setFirstName)
  // }, [contract, tokenId])

  return (
    <tr>
      <td>{student.id}</td>
      <td>{student.className}</td>
      <td>{student.name}</td>
      <td>{student.guild}</td>
      <td>{student.club}</td>
      <td>{student.talent}</td>
    </tr>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const svgs = await Promise.all(Array.from(Array(300).keys()).map(i => {
    return fetch(`https://metadata.mch.plus/erc721/137/0x9dC9e20E35F7Af608C4e7233a95DB50bDF5f8F9e/${i + 1}/image`)
      .then(res => res.text())
  }))
  const students = svgs
    .map(svg => new JSDOM(svg))
    .map((dom, i) => {
      const className = dom.window.document.querySelector('text[y="20"]')?.textContent
      const name = dom.window.document.querySelector('text[y="40"]')?.textContent
      const guild = dom.window.document.querySelector('text[y="60"]')?.textContent
      const club = dom.window.document.querySelector('text[y="80"]')?.textContent
      const talent = dom.window.document.querySelector('text[y="100"]')?.textContent
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
    <div className="container">
      <h1>Blockchain Gakuen Loot</h1>
      <table>
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
          {students.map(student => (
            <Row key={student.id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HomePage
