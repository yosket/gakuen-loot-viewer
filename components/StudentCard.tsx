import { ExternalLinkIcon, UserIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import { ethers } from 'ethers'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { getCroppedAddress } from '../lib/util'
import { Owner } from '../types/Owner'
import { Student } from '../types/Student'

type ParamProps = {
  label: string
  value: number
}

const Param: FC<ParamProps> = ({ label, value }) => (
  <div className="grid justify-items-center bg-gray-50 py-1 px-2 rounded-2xl">
    <span className="text-xs text-gray-400">{label}</span>
    <span className="text-gray-500">{value}</span>
  </div>
)

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

      <div className="-mt-2 flex-1 space-y-2 flex flex-col">
        <div>
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
        </div>
        <div className="grid justify-items-start content-start flex-1">
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
        <div className="grid grid-cols-2 gap-2">
          <Param
            label="HP"
            value={Number(ethers.utils.formatEther(owner.hp))}
          />
          <Param
            label="PHY"
            value={Number(ethers.utils.formatEther(owner.phy))}
          />
          <Param
            label="INT"
            value={Number(ethers.utils.formatEther(owner.int))}
          />
          <Param
            label="AGI"
            value={Number(ethers.utils.formatEther(owner.agi))}
          />
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
          <span>{`${Number(
            ethers.utils.formatEther(owner.gCoinBalance)
          ).toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          })} GCOIN`}</span>
        </span>
      </a>
    </div>
  )
}

export default StudentCard
