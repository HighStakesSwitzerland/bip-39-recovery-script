import {Secp256k1HdWallet} from "@cosmjs/launchpad";
import {stringToPath} from "@cosmjs/crypto";
import {bip39words} from "./bip39words.js";

async function startApp() {
    const injectiveDerivationPath = stringToPath("m/44'/118'/0'/0/0"); // 118 for cosmos
    const expectedAddress = "cosmos1xxxxxx";
    const incompleteMnemo = ["your", "23", "seed", "words", "goes", "here", "..."];
    let mnemo = [];

    let testCount = 0;
    for (const word of bip39words) {
        console.log("Testing word " + word);
        for (let i = 0; i <= incompleteMnemo.length; i++) {
            const start = incompleteMnemo.slice(0, i);
            const end = incompleteMnemo.slice(i, incompleteMnemo.length);
            mnemo = start.concat(word, ...end);
            testCount++;
            try {
                const secp256k1HdWallet = await Secp256k1HdWallet
                    .fromMnemonic(
                        mnemo.join(" "),
                        injectiveDerivationPath,
                        "cosmos"); // set the corresponding bech32 prefix

                const accountData = await secp256k1HdWallet.getAccounts();

                if (expectedAddress === accountData[0].address) {
                    console.log("Found it!", mnemo);
                    return;

                }
            } catch (ex) {
                //console.log(ex)
            }
            if (testCount % 10 === 0) {
                console.log("Tested " + testCount + " combinations" + " with word " + word);
            }
        }
    }
}

startApp().then();
