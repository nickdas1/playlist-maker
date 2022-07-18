import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PlaylistView() {
    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let songs = await axios.get(`/api/playlist/${id}`);
            setData(songs.data);
        };
        getData();
    }, [id]);

    return (
        <div>
            {data.map((data) => {
                return <p>{data.test}</p>;
            })}
        </div>
    );
}
