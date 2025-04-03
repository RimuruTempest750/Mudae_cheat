<h1 align="center">Mudae_cheat | Auto Claim & Auto Roll !</h1>
<em><h5 align="center">(Programming Language - Node.js | Shell)</h5></em>

<p align="center">
  <img src="https://img.shields.io/github/stars/RimuruTempest750/Mudae_cheat">
  <img src="https://img.shields.io/github/license/RimuruTempest750/Mudae_cheat">
  <img src="https://img.shields.io/github/repo-size/RimuruTempest750/Mudae_cheat">
  <img src="https://img.shields.io/badge/stability-stable-green">
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/module-name">
  <img src="https://img.shields.io/npm/v/discord.js-selfbot-v13?label=discord.js-selfbot-v13">
</p>

<h4 align="center">/\ I am in no way responsible for what you do with this code or any uses, this is for educational purposes and above all for intuitive purposes !<br>This is not to be done on public servers and it does not respect the TOS Discord, so it remains for educational purposes only !</h4>

# Tutorial to install the bot ! For LINUX (VPS or Dedicated Server)

## 1 - on Terminal

<h5>A) Auto installer</h5>

- Run command :

```shell script
bash <(curl -s https://raw.githubusercontent.com/RimuruTempest750/Mudae_cheat/main/setup.sh)
```
<h5>B) Manual installer</h5>

```shell script
apt update && apt upgrade -y
apt install npm nodejs git -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
apt-get install -y nodejs
```

```shell script
git clone https://github.com/RimuruTempest750/Mudae_cheat.git
cd Mudae_cheat/
npm i
npm i pm2 -g
```
## 2 - on Terminal

```shell script
nano config.json
```

- And you also change this line :

```json
{
    "token": "ACCOUNT_TOKEN", <- Edit
    "channelId": "CHANNEL_ID", <- Edit
    "BotID": "432610292342587392",
    "timeClaim": 1500, <- Edit
    "_note": "timeClaim is the delay in milliseconds. For example, 1500 = 1.5 seconds. Set to 0 for no delay."
}
```

- After doing this, press CTRL + X and you press Y and ENTER then you do the following commands !

## 3 - on Terminal

```shell script
nano keywords.json
```

- And you also change this line :

```json
// Exemple
// You can directly put the names of the characters you want, 
but be careful to put the precise names written on the cards !
{
    "keywords": [
        "No Game No Life",
        "Dragon Ball",
        "One Piece",
        "Naruto",
        "Pokédex"
    ]
}
```

- After doing this, press CTRL + X and you press Y and ENTER then you do the following commands !

## 4 - on Terminal

```shell script
node main.js
---------- choice ----------
pm2 start main.js -n Mudae_cheat
```

<h3 align="center">If you like this repository don't hesitate to give it a star ⭐ !</h3>
