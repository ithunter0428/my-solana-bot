import { Connection, PublicKey,} from "@solana/web3.js";
import { LiquidityPoolKeys, Liquidity, TokenAmount, Token, Percent, TOKEN_PROGRAM_ID, SPL_ACCOUNT_LAYOUT,  TokenAccount } from "@raydium-io/raydium-sdk";

export async function getTokenAccountsByOwner(
	connection: Connection,
	owner: PublicKey,
) {
	const tokenResp = await connection.getTokenAccountsByOwner(
		owner,
		{
			programId: TOKEN_PROGRAM_ID
		},
	);

	const accounts: TokenAccount[] = [];

	for (const { pubkey, account } of tokenResp.value) {
		accounts.push({
			programId: TOKEN_PROGRAM_ID,
			pubkey,
			accountInfo:SPL_ACCOUNT_LAYOUT.decode(account.data)
		});
	}

	return accounts;
}