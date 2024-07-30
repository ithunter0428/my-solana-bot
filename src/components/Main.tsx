import React, {
	FC,
	useState,
	ChangeEvent,
	MouseEventHandler,
	useEffect
} from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import {
  SOL_IMG,
  RAY_IMG,
  RAY_SOL_LP_V4_POOL_KEY,
  RAYDIUM_LIQUIDITY_JSON,
  RAY_TOKEN_MINT
} from '../constant';
import {
  Liquidity,
  LiquidityPoolKeys,
  jsonInfo2PoolKeys,
  LiquidityPoolJsonInfo,
  TokenAccount,
} from "@raydium-io/raydium-sdk";
import { getTokenAccountsByOwner } from '../utils';

const Main: FC = () => {
	const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
	const [solBalance, setSolBalance] = useState<number>(0);
	const [rayBalance, setRayBalance] = useState<number>(0);
	const [exchangeRate, setExchangeRate] = useState<string>('');

	const [raySolPoolKey, setRaySolPoolKey] = useState<LiquidityPoolKeys>();
  const [tokenAccounts, setTokenAccounts] = useState<TokenAccount[]>([]);

  const [alertHeading, setAlertHeading] = useState<string>('');
  const [alertContent, setAlertContent] = useState<string>('');
  const [alertType, setAlertType] = useState<string>('danger');
  const [alertShow, setAlertShow] = useState<boolean>(false);

  const [input, setInput] = useState<string>('0');
  const [output, setOutput] = useState<string>('0');

  const [swapInDirection, setSwapInDirection] = useState<boolean>(false); // IN: RAY to SOL; OUT: SOL to RAY

	useEffect(() => {
    const getAccountInfo = async () => {
      if (publicKey !== null) {
				try {
					const balance = await connection.getBalance(publicKey); // get SOL balance
					setSolBalance(balance / LAMPORTS_PER_SOL);
	
					const tokenAccs = await getTokenAccountsByOwner(connection, publicKey as PublicKey); // get all token accounts
					setTokenAccounts(tokenAccs);
	
					let rayTokenAddress: PublicKey;
					tokenAccs.filter(acc => acc.accountInfo.mint.toBase58() === RAY_TOKEN_MINT).map(async (acc) => {
						rayTokenAddress = acc.pubkey;
						const accBalance = await connection.getTokenAccountBalance(rayTokenAddress);
						const rayBal = accBalance.value.uiAmount || 0;
						setRayBalance(rayBal);
					});
				}
        catch(e) {
					console.log(e)
				}
      }
    };

		getAccountInfo();
	}, [publicKey, connection])

	console.log('solBalance', solBalance)

	return (<></>)
}

export default Main;
