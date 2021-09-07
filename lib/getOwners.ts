import { ethers } from 'ethers'
import { STUDENT_COUNT } from '../constants/app'
import { ABI, CONTRACT_ADDRESS } from '../constants/contract'
import { Owner } from '../types/Owner'

export const getOwners = async (): Promise<Owner[]> => {
  const ethereumProvider = new ethers.providers.InfuraProvider(
    1,
    process.env.INFURA_PROJECT_ID
  )
  const polygonProvider = new ethers.providers.InfuraProvider(
    137,
    process.env.INFURA_PROJECT_ID
  )
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, polygonProvider)
  const owners = await Promise.all(
    Array.from(Array(STUDENT_COUNT).keys()).map(async (i) => {
      const tokenId = i + 1
      return contract.ownerOf(tokenId).then(async (address: string) => {
        const ens = await ethereumProvider.lookupAddress(address)
        return { id: tokenId, address, ens }
      })
    })
  )
  return owners
}
