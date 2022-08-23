# bip-39-recovery-script
This script can be used to find one missing word over a 12 or 24 seed phrase private key

It iterates over the 2048 words of bip39 list to insert each word between every word of the seed phrase until it find the expected address.

# How to use
Edit src/app.ts to fill the required fields
Run with `npm run dev`
