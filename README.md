# Couch Potato

Couch Potato is a Chrome extension allowing multiple users to remotely and simultaneously stream video content, compatible with the Hulu web player.

## Getting Started

In order to test this program on a local machine, you will have to update references to `couch-potato-extension.herokuapp.com` with your local host (e.g. `http://localhost:3000`).

```
npm install
npm run start-dev
```

For convenience, we have included a `comments` branch which includes explanations of our code.

```
git checkout comments
```

## Built With

- [Chrome Extensions](https://developer.chrome.com/extensions/getstarted) - The architecture used
- [Socket.io](https://socket.io/get-started/chat) - Real-time chat features
- [React.js](https://reactjs.org/) - Building user interface

## Authors

- **Dani Meyer** - [GitHub Profile](https://github.com/dlm19)
- **Eunjoon Hwang** - [GitHub Profile](https://github.com/joonybejoy)
- **Grace Murray** - [GitHub Profile](https://github.com/gkmurray124)
- **Caitlin Floyd** - [GitHub Profile](https://github.com/cafloyd)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- We drew inspiration from the [Netflix Party extension](https://chrome.google.com/webstore/detail/netflix-party/oocalimimngaihdkbihfgmpkcpnmlaoa?hl=en) and looked at the [source code](https://github.com/netflixparty1/netflixparty-chrome) to help us get started

### Tutorials

- Integrating Socket.io into a Chrome Extension: [Video](https://www.youtube.com/watch?v=1zVoGTQUXvs) and [corresponding repo](https://github.com/matthewlawson/lnm-socket.io)
- Build Real Time Chat Rooms With Node.js And Socket.io: [Video](https://www.youtube.com/watch?v=UymGJnv-WsE) and [corresponding repo](https://github.com/WebDevSimplified/Realtime-Chat-App-With-Rooms)
