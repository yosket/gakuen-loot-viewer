import { ethers } from 'ethers'
import { STUDENT_COUNT } from '../constants/app'
import {
  ABI,
  AGI_ABI,
  AGI_CONTRACT_ADDRESS,
  CONTRACT_ADDRESS,
  GCOIN_ABI,
  GCOIN_CONTRACT_ADDRESS,
  HP_ABI,
  HP_CONTRACT_ADDRESS,
  INT_ABI,
  INT_CONTRACT_ADDRESS,
  PHY_ABI,
  PHY_CONTRACT_ADDRESS,
} from '../constants/contracts'
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
  const gCoinContract = new ethers.Contract(
    GCOIN_CONTRACT_ADDRESS,
    GCOIN_ABI,
    polygonProvider
  )
  const hpContract = new ethers.Contract(
    HP_CONTRACT_ADDRESS,
    HP_ABI,
    polygonProvider
  )
  const phyContract = new ethers.Contract(
    PHY_CONTRACT_ADDRESS,
    PHY_ABI,
    polygonProvider
  )
  const intContract = new ethers.Contract(
    INT_CONTRACT_ADDRESS,
    INT_ABI,
    polygonProvider
  )
  const agiContract = new ethers.Contract(
    AGI_CONTRACT_ADDRESS,
    AGI_ABI,
    polygonProvider
  )
  const owners = await Promise.all(
    Array.from(Array(STUDENT_COUNT).keys()).map(async (i) => {
      const tokenId = i + 1
      return contract.ownerOf(tokenId).then(async (address: string) => {
        const [ens, balance, hpBn, phyBn, intBn, agiBn] = await Promise.all([
          ethereumProvider.lookupAddress(address),
          gCoinContract.balanceOf(address) as Promise<ethers.BigNumber>,
          hpContract.balanceOf(address) as Promise<ethers.BigNumber>,
          phyContract.balanceOf(address) as Promise<ethers.BigNumber>,
          intContract.balanceOf(address) as Promise<ethers.BigNumber>,
          agiContract.balanceOf(address) as Promise<ethers.BigNumber>,
        ])
        const gCoinBalance = balance.toString()
        const hp = hpBn.toString()
        const phy = phyBn.toString()
        const int = intBn.toString()
        const agi = agiBn.toString()
        return {
          id: tokenId,
          address,
          ens,
          gCoinBalance,
          hp,
          phy,
          int,
          agi,
        } as Owner
      })
    })
  )
  return owners
}
