# "I Voted" sticker generator

## Impetus

I moved abroad before the 2020 election, and before that, voted by mail in the New York State primary while quarantining in NYC. Unfortunately, neither absentee ballots came with an "I Voted" sticker that are a regular part of U.S. elections.

Overseas voters are pointed to the [Foreign Voter Assistance Program](https://www.fvap.gov/) for assistance requesting a ballot. The website also gives you a sticker declaring where you voted from, but only for a [pre-defined list of locations](https://www.fvap.gov/IVotedSticker?id=219). I figured I could hack this with a few lines of code in DevTools, but it turns out they're just [.jpgs](https://www.fvap.gov/uploads/FVAP/I-Voted-Sticker/Svalbard%20and%20Jan%20Mayen.jpg) that someone had to recreate and upload for 254 different countries and subnational entities (as of the last commit to this README).

This is my recreation of the FVAP sticker, but for *any* arbitrary location.

So, if you're dying for a sticker because your municipality does not send them with your ballot or really want to say you voted from your studio apartment in Brooklyn, you've come to the right place!

## Things that are worth adding before the next election cycle

- Support for arbitrary languages
- `@media print` styling
- embiggen the text instead of monotonically ensmalliing it on text change
- jazzy graphics and geometries you can choose from

## Technical notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
