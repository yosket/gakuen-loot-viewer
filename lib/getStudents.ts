import { JSDOM } from 'jsdom'
import { STUDENT_COUNT } from '../constants/app'
import { CONTRACT_ADDRESS } from '../constants/contracts'
import { Student } from '../types/Student'

const getMetadataApiUrl = (contract: string, tokenId: number): string =>
  `https://metadata.mch.plus/erc721/137/${contract}/${tokenId}/image`

export const getStudents = async (): Promise<Student[]> => {
  const svgs = await Promise.all(
    Array.from(Array(STUDENT_COUNT).keys()).map(async (i) => {
      const tokenId = i + 1
      const res = await fetch(getMetadataApiUrl(CONTRACT_ADDRESS, tokenId))
      return await res.text()
    })
  )

  const students = svgs
    .map((svg) => new JSDOM(svg))
    .map((dom) => dom.window.document)
    .map((doc, i) => {
      const id = i + 1
      const className = doc.querySelector('text[y="20"]')?.textContent ?? ''
      const name = doc.querySelector('text[y="40"]')?.textContent ?? ''
      const guild = doc.querySelector('text[y="60"]')?.textContent ?? ''
      const club = doc.querySelector('text[y="80"]')?.textContent ?? ''
      const talent = doc.querySelector('text[y="100"]')?.textContent ?? ''
      return { id, className, name, guild, club, talent }
    })

  return students
}
