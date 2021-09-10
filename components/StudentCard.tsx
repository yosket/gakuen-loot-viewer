import { ExternalLinkIcon, UserIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import { ethers } from 'ethers'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { getCroppedAddress } from '../lib/util'
import { Owner } from '../types/Owner'
import { Student } from '../types/Student'

type Props = {
  student: Student
  owner: Owner
}

const StudentCard: FC<Props> = ({ student, owner }) => {
  const grade = Number(student.className.substr(0, 1))
  const id = `000${student.id}`.slice(-3)

  return (
    <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
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

      <div className="-mt-2 flex-1">
        <Link href={`/?class=${student.className}`}>
          <a
            className={cn('font-bold text-lg hover:underline', {
              'text-purple-500': grade === 3,
              'text-green-500': grade === 2,
              'text-orange-500': grade === 1,
            })}
          >
            {student.className}
          </a>
        </Link>
        <h3 className="font-bold text-2xl">{student.name}</h3>
        <p>{`Student ID: ${id}`}</p>
        <div className="mt-2 grid justify-items-start">
          <Link href={`/?guild=${student.guild}`}>
            <a className="text-sm text-gray-500 hover:underline">
              {student.guild}
            </a>
          </Link>
          <Link href={`/?club=${student.club}`}>
            <a className="text-sm text-gray-500 hover:underline">
              {student.club}
            </a>
          </Link>
          <Link href={`/?talent=${student.talent}`}>
            <a className="text-sm text-gray-500 hover:underline">
              {student.talent}
            </a>
          </Link>
        </div>
      </div>

      <a
        href={`https://polygonscan.com/address/${owner.address}`}
        target="_blank"
        rel="noreferrer"
        className="flex justify-between items-center bg-gray-50 text-gray-500 text-sm p-4 mt-4 -mx-4 -mb-4 rounded-b-2xl space-x-2"
      >
        <UserIcon className="w-6 h-6" />
        <span className="flex-1 grid justify-items-end">
          <span className="inline-flex items-center space-x-2">
            <span>{owner.ens ?? getCroppedAddress(owner.address)}</span>
            <ExternalLinkIcon className="w-4 h-4" />
          </span>
          <span>{`${ethers.utils
            .formatEther(owner.gCoinBalance)
            .substr(0, 8)} GCOIN`}</span>
        </span>
      </a>
    </div>
  )
}

export default StudentCard
