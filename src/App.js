import React from 'react'
import axios from 'axios'
function App(){
    const [post, setPost] = useState({
        title: '',
        body: ''
    })
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.event})
    }

    return ()

}