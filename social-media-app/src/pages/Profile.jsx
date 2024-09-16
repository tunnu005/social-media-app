'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog"
import { ScrollArea } from "../components/ui/scroll-area"
import { Heart, MessageCircle } from "lucide-react"
import Lilmenu from "../component/lilmenubar"
import image1 from "../../public/images/3.png"
import image2 from "../../public/images/4.png"
import image3 from "../../public/images/5.png"
import image4 from "../../public/images/6.png"
import image5 from "../../public/images/7.png"
import image6 from "../../public/images/8.png"
import { useNavigate } from 'react-router-dom'

// Mock data for the profile and posts
const profile = {
    name: "Jane Doe",
    username: "@janedoe",
    bio: "Photography enthusiast | Travel lover | Coffee addict",
    followers: 1234,
    following: 567,
}

const posts = [
    { id: 1, image: image1, caption: "Beautiful sunset", likes: 120, comments: 15 },
    { id: 2, image: image2, caption: "City lights", likes: 89, comments: 7 },
    { id: 3, image: image3, caption: "Mountain view", likes: 200, comments: 25 },
    { id: 4, image: image4, caption: "Beach day", likes: 150, comments: 18 },
    { id: 5, image: image5, caption: "Coffee time", likes: 75, comments: 5 },
    { id: 6, image: image6, caption: "Coffee time", likes: 324, comments: 45 },
    { id: 1, image: image1, caption: "Beautiful sunset", likes: 120, comments: 15 },
    { id: 2, image: image2, caption: "City lights", likes: 89, comments: 7 },
    { id: 3, image: image3, caption: "Mountain view", likes: 200, comments: 25 },
    { id: 4, image: image4, caption: "Beach day", likes: 150, comments: 18 },
    { id: 5, image: image5, caption: "Coffee time", likes: 75, comments: 5 },
    { id: 6, image: image6, caption: "Coffee time", likes: 324, comments: 45 },
    // More posts here...
]

export default function CoolProfilePage() {
    const [selectedPost, setSelectedPost] = useState(null)
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(selectedPost?.likes ?? 0)
    const handleLike = () => {
        const newLikedState = !liked
        setLiked(newLikedState)
        setLikes(likes + (newLikedState ? 1 : -1))
        onLike(newLikedState)
    }
    
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex ">
            <div className="fixed top-0 left-0 w-[3%] h-full z-20">
                <Lilmenu  />
            </div>
            {/* Fixed Profile Information */}
            <Card className="fixed top-8 left-20 w-80 h-[28rem] p-6 space-y-6 z-10">
                <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32 relative overflow-hidden rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3 hover:shadow-xl hover:shadow-gray-500/50">
                        <AvatarImage src={image6} alt={profile.name} className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3 hover:shadow-xl hover:shadow-gray-500/50" />
                        <AvatarFallback className="bg-gray-800 text-white w-full h-full flex items-center justify-center font-bold">
                            {profile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <p className="text-muted-foreground">{profile.username}</p>
                    </div>
                </div>
                <p className="text-center">{profile.bio}</p>
                <div className="flex justify-center space-x-4">
                    <div className="text-center">
                        <p className="font-bold">{profile.followers}</p>
                        <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold">{profile.following}</p>
                        <p className="text-sm text-muted-foreground">Following</p>
                    </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-slate-950 via-gray-800 to-slate-950 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-gray-700 hover:via-gray-900 hover:to-gray-700 hover:scale-105 hover:text-gray-100 transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] relative overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-30 transition-opacity duration-500"></span>
                    Edit Profile
                </Button>
            </Card>

            {/* Fixed AppName */}
            {/* <div className="fixed bottom-8 left-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg text-center text-white shadow-lg cursor-pointer" onClick={()=>{navigate('/')}}>
                <div className="text-3xl font-bold">
                    AppName
                </div>
            </div> */}

            {/* Posts Grid */}
            <div className="ml-96 flex-1">
                <div className="grid grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <Dialog key={post.id}>
                            <DialogTrigger asChild>
                                <Card className="group relative cursor-pointer overflow-hidden">
                                    <CardContent className="p-0">
                                        <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="text-white text-center">
                                                <p className="font-bold">{post.likes} likes</p>
                                                <p>{post.comments} comments</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] text-white">
                                <div className="space-y-4">
                                    <img src={post.image} alt={post.caption} className="w-full h-96 object-cover rounded-lg" />
                                    <p className="text-center font-medium">{post.caption}</p>
                                    <div className="flex justify-between items-center">
                                        <Button variant="ghost" size="sm">
                                            <Heart className="w-5 h-5 mr-2" />
                                            {post.likes} likes
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <MessageCircle className="w-5 h-5 mr-2" />
                                            {post.comments} comments
                                        </Button>
                                    </div>
                                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                        {/* Mock comments - replace with actual comments data */}
                                        {Array.from({ length: post.comments }).map((_, i) => (
                                            <div key={i} className="mb-4">
                                                <p className="font-semibold">User {i + 1}</p>
                                                <p className="text-sm text-muted-foreground">Great post!</p>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </div>
    )
}
