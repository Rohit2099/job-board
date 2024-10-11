import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const POSTS_PER_PAGE = 6;

function fetchPosts(jobIds) {
    let promPost = [];
    promPost = jobIds.map((id) => {
        return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    });

    return Promise.all(promPost);
}

export default function Posts({ items }) {
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(0);
    const [loading, setLoading] = useState(true);
    const [allLoaded, setAllLoaded] = useState(false);

    useEffect(() => {
        const loadData = async (jobIds) => {
            let fetchedPosts = await fetchPosts(jobIds);
            setPosts((p) => [...p, ...fetchedPosts]);
            setLoading(false);
        };

        if (items.length > 0) {
            var toLoad = items.slice(loaded, loaded + POSTS_PER_PAGE);
            loadData(toLoad);
        }

        if (items.length != 0 && loaded + POSTS_PER_PAGE > items.length) {
            setAllLoaded(true);
        }
    }, [items, loaded]);

    function loadMoreJobs() {
        setLoaded((l) => l + 6);
    }

    if (loading) {
        return (
            <>
                <div className="post-title">Loading...</div>
            </>
        );
    }
    return (
        <>
            {posts.map((post, i) => {
                return (
                    <div key={i} className="post-container">
                        <div className="post-title">{post.data.title}</div>
                        <div className="post-body-container">
                            <p className="item1">By {post.data.by}</p>
                            <p className="item1">&middot;</p>
                            <p>{new Date(post.data.time).toDateString()}</p>
                        </div>
                    </div>
                );
            })}
            {!allLoaded && (
                <button className="morejobs" id="loadmore" onClick={loadMoreJobs}>
                    Load more jobs
                </button>
            )}
        </>
    );
}
