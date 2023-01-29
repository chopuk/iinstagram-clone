import { USERS } from './users'
export const POSTS = [
    {
        id: 1,
        imageUrl: 'http://192.168.0.220:4000/insta/a01.jpg',
        user: USERS[0].name,
        likes: 66,
        caption: 'This Is Interesting My Friends',
        profilePicture: USERS[0].image,
        comments: [
            {
                user: USERS[1].name,
                comment: 'Wow! I just had to comment xxx'
            },
            {
                user: USERS[2].name,
                comment: 'Wow! And so did I xxx'
            }
        ]
    },
    {
        id: 2,
        imageUrl: 'http://192.168.0.220:4000/insta/a02.jpg',
        user: USERS[1].name,
        likes: 44,
        caption: 'A Nice Walk In The Sun',
        profilePicture: USERS[1].image,
        comments: [
            {
                user: USERS[3].name,
                comment: 'Where is your hat my friend?'
            },
            {
                user: USERS[4].name,
                comment: 'Looks like you enjoyed yourself bud'
            }
        ]
    },
    {
        id: 3,
        imageUrl: 'http://192.168.0.220:4000/insta/a03.jpg',
        user: USERS[2].name,
        likes: 234,
        caption: 'My Doggy Friend',
        profilePicture: USERS[2].image,
        comments: [
            {
                user: USERS[5].name,
                comment: 'Whe looks like a good boy'
            },
            {
                user: USERS[6].name,
                comment: 'This is quite a long comment so I hope is looks OK on the App'
            }
        ]
    },
    {
        id: 4,
        imageUrl: 'http://192.168.0.220:4000/insta/a04.jpg',
        user: USERS[3].name,
        likes: 1024,
        caption: 'Brexit Is A Bugger',
        profilePicture: USERS[3].image,
        comments: [
            {
                user: USERS[7].name,
                comment: 'There is no turning back now'
            },
            {
                user: USERS[8].name,
                comment: 'I was cheated'
            },
            {
                user: USERS[8].name,
                comment: 'Enough said'
            }
        ]
    },
    {
        id: 5,
        imageUrl: 'http://192.168.0.220:4000/insta/a05.jpg',
        user: USERS[4].name,
        likes: 23456,
        caption: 'I Take My Hat Off To You',
        profilePicture: USERS[4].image,
        comments: [
            {
                user: USERS[9].name,
                comment: 'Wow! And I to you!'
            }
        ]
    },
    {
        id: 6,
        imageUrl: 'http://192.168.0.220:4000/insta/a06.jpg',
        user: USERS[4].name,
        likes: 5,
        caption: 'Look Out World',
        profilePicture: USERS[4].image,
        comments: [
            {
                user: USERS[5].name,
                comment: 'Look out for what?'
            },
            {
                user: USERS[3].name,
                comment: 'Here I come'
            },
            {
                user: USERS[8].name,
                comment: 'The world is looking out sonny'
            }
        ]
    },
    {
        id: 7,
        imageUrl: 'http://192.168.0.220:4000/insta/a07.jpg',
        user: USERS[5].name,
        likes: 0,
        caption: 'The Science Of The Brain',
        profilePicture: USERS[5].image,
        comments: [

        ]
    },
    {
        id: 8,
        imageUrl: 'http://192.168.0.220:4000/insta/a08.jpg',
        user: USERS[6].name,
        likes: 678,
        caption: 'Amit The Most Beautiful',
        profilePicture: USERS[6].image,
        comments: [
            {
                user: USERS[7].name,
                comment: 'Will there ever be another girl so beautiful? I do not think so'
            },
            {
                user: USERS[11].name,
                comment: 'Definitely not. The world is her oyster'
            }
        ]
    },
    {
        id: 9,
        imageUrl: 'http://192.168.0.220:4000/insta/a09.jpg',
        user: USERS[2].name,
        likes: 3,
        caption: 'Pink Floyd Rule',
        profilePicture: USERS[2].image,
        comments: [
            {
                user: USERS[7].name,
                comment: 'Yet another brick in the wall'
            },
            {
                user: USERS[10].name,
                comment: 'I feel comfortably numb'
            },
            {
                user: USERS[8].name,
                comment: 'WThe sun is the same in a relative way but I am so much older'
            },
            {
                user: USERS[8].name,
                comment: 'Get a good job with more pay then you will be okay'
            }
        ]
    },{
        id: 10,
        imageUrl: 'http://192.168.0.220:4000/insta/a10.jpg',
        user: USERS[8].name,
        likes: 1245,
        caption: 'I Cannot Believe This!',
        profilePicture: USERS[8].image,
        comments: [
            {
                user: USERS[4].name,
                comment: 'Yes it must bt CGI'
            },
            {
                user: USERS[9].name,
                comment: 'Spreading conspiracy theories again tut tut'
            }
        ]
    }
]