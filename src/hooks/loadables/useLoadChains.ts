import { useEffect } from 'react'
import {
  type ChainInfo,
  FEATURES,
  GAS_PRICE_TYPE,
  RPC_AUTHENTICATION,
} from '@safe-global/safe-gateway-typescript-sdk'
import useAsync, { type AsyncResult } from '../useAsync'
import { Errors, logError } from '@/services/exceptions'

const contractAddresses = {
  createCallAddress: '0x08824037d16CF836F86d29F1ED147Ff9b275D027' as `0x${string}`,
  fallbackHandlerAddress: '0x93563b6D0Cc0f67250e97d2ac610B785d4EA7c0E' as `0x${string}`,
  multiSendAddress: '0x0d4B4516043Cc7b2f4091f170bAeDF76da76a3F4' as `0x${string}`,
  multiSendCallOnlyAddress: '0x055aA3E8ca247eEa1eceeEC75715E291668d65D1' as `0x${string}`,
  safeProxyFactoryAddress: '0x3A9322482A72fa9658f7897C9c99F18Da6B4873c' as `0x${string}`,
  safeSingletonAddress: '0x2678894f6F12F0Cb0af94F2d414414345E0784A5' as `0x${string}`,
  safeWebAuthnSignerFactoryAddress: null, // If not used
  signMessageLibAddress: '0x56d7B892B43EEE192318d536B504070574d078D8' as `0x${string}`,
  simulateTxAccessorAddress: '0xD9b95bF306f3706072B63E226955Ca1564113665' as `0x${string}`,
}

const getConfigs = async (): Promise<ChainInfo[]> => {
  return [
    {
      transactionService: 'http://localhost:8000',
      chainId: '268',
      chainName: 'Neura',
      chainLogoUri: '',
      shortName: 'neura',
      l2: true,
      isTestnet: true,
      description: 'Neura Local Chain',
      rpcUri: {
        authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
        value: 'http://127.0.0.1:8545',
      },
      safeAppsRpcUri: {
        authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
        value: 'http://127.0.0.1:8545',
      },
      publicRpcUri: {
        authentication: RPC_AUTHENTICATION.NO_AUTHENTICATION,
        value: 'http://127.0.0.1:8545',
      },
      blockExplorerUriTemplate: {
        address: '',
        txHash: '',
        api: '',
      },
      nativeCurrency: {
        name: 'ANKR',
        symbol: 'ANKR',
        decimals: 18,
        logoUri: '',
      },
      theme: {
        textColor: '#ffffff',
        backgroundColor: '#000000',
      },
      gasPrice: [
        {
          type: GAS_PRICE_TYPE.FIXED,
          weiValue: '1000000000',
        },
      ],
      disabledWallets: [],
      features: [
        FEATURES.ERC721,
        FEATURES.SAFE_TX_GAS_OPTIONAL,
        FEATURES.EIP1559,
        FEATURES.SAFE_APPS
      ],
      ensRegistryAddress: null,
      contractAddresses,
      balancesProvider: {
        chainName: null,
        enabled: false,
      },
    },
  ]
}

export const useLoadChains = (): AsyncResult<ChainInfo[]> => {
  const [data, error, loading] = useAsync<ChainInfo[]>(getConfigs, [])

  // Log errors
  useEffect(() => {
    if (error) {
      logError(Errors._620, error.message)
    }
  }, [error])

  return [data, error, loading]
}

export default useLoadChains
