import { getPublicKey, nip19 } from 'nostr-tools';
import React from 'react';
export const UserContext = React.createContext();

function UserProvider({ children }) {
    const [bookmarks, setBookmarks] = React.useState([])
    const [privateKey, setPrivateKey] = React.useState('')
    const [publicKey, setPublicKey] = React.useState('')
    const [loggedIn, setLoggedIn] = React.useState(false)

    React.useEffect(() => {
        // Check if the user is already logged in
        const storedLoggedIn = localStorage.getItem('loggedIn')
        if (storedLoggedIn) {
            setLoggedIn(true)
        }
    }, [])

    function toggleLogin() {
        setLoggedIn(!loggedIn)
        localStorage.setItem('loggedIn', (!loggedIn).toString())
    }


    React.useEffect(() => {
        const storedPrivateKey = localStorage.getItem('privateKey')
        if (storedPrivateKey) {
            setPrivateKey(storedPrivateKey)
            setPublicKey(getPublicKey(storedPrivateKey))
        }
    }, [])

    function savePrivateKey(val) {
        let v = val
        if (val.includes('nsec')) {
            let { data } = nip19.decode(val)
            v = data
        }
        setPrivateKey(v)
        localStorage.setItem('privateKey', v.toString())
        if (v.length === 64) {
            setPublicKey(getPublicKey(v))
        }

    }

    React.useEffect(() => {
        const storedBookmarks = localStorage.getItem('bookmarks')
        if (storedBookmarks && bookmarks.length == 0) {

            setBookmarks(JSON.parse(storedBookmarks))

        } else if (bookmarks.length > 0) {
            setBookmarks([JSON.parse(storedBookmarks), ...bookmarks])

        }
    }, [])

    function saveBookmarks(val, hardReset = false) {
        if (hardReset) {
            setBookmarks(val)
            localStorage.setItem('bookmarks', JSON.stringify(val))
            return
        }
        let setBK = new Set([val, ...bookmarks.flat()].flat())
        let newBK = [...setBK].flat()
        console.log(newBK)
        setBookmarks(newBK.flat())
        localStorage.setItem('bookmarks', JSON.stringify(newBK.flat()))


    }



    return (
        <UserContext.Provider
            value={{
                privateKey,
                savePrivateKey,
                loggedIn,
                publicKey,
                toggleLogin,
                saveBookmarks,
                bookmarks
            }}
        >

            {children}

        </UserContext.Provider >
    );
}

export default UserProvider;