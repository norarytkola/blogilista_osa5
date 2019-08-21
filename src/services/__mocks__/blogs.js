


const blogs=[
    {
    title: "Pohdintaa",
    author: "Sara Parikka",
    url: "https://anna.fi/sara-parikka/blogi/",
    likes: 0,
    user: {
    username: "rytkonor",
    name: "Nora Rytkölä",
    id: "5d54fc6950d16019c488945b"
    },
    id: "5d5a64d97e05ef3ce04c1b45"
    },
    {
    title: "Syksyn värit",
    author: "Miisa Maisanen",
    url: "www.blogi.fi/miisa",
    likes: 0,
    user: {
    username: "rytkonor",
    name: "Nora Rytkölä",
    id: "5d54fc6950d16019c488945b"
    },
    id: "5d5a65267e05ef3ce04c1b47"
    }
    ]

const getAll = () => {
    return Promise.resolve(blogs)
      }
      
      export default { getAll }