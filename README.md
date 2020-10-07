# "I voted" sticker generator

## Impetus

I moved abroad before the 2020 election, and before that, voted by mail in the New York State primary while on lockdown. Unfortunately, not all absentee ballots come with an "I voted" sticker that are a regular part of U.S. elections.

Overseas voters are given resources to request a ballot from the [Foreign Voter Assistance Program](https://www.fvap.gov/) - as well as a set of stickers, but only for a [pre-defined list of countries](https://www.fvap.gov/IVotedSticker?id=219). I figured I could hack this with a few lines of code in developer tools, but it turns out they're just [.jpgs](https://www.fvap.gov/uploads/FVAP/I-Voted-Sticker/Svalbard%20and%20Jan%20Mayen.jpg) that someone had to recreate and upload for 254 different countries and subnational entities (as of the last commit to this README). This is my recreation of the sticker, but for *any* arbitrary location.

So, if you're dying for a sticker because your municipality does not send them with your ballot or really want to say you voted from your studio apartment in Brooklyn, you've come to the right place!

## Things that are worth adding before the next election cycle

- Support for arbitrary languages
- `@media print` styling
- embiggen the text instead of monotonically ensmalliing it on text change
- jazzy graphics and geometries

## Technical notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
