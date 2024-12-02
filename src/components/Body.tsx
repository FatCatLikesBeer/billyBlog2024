import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import PocketBaseAtom from "../state/PocketBaseAtom";

export default function Body() {
  const [posts, setPosts] = useState<any>(placeHolderContent);
  const pb = useAtomValue(PocketBaseAtom);

  useEffect(() => {
    pb.collection('posts').getList()
      .then((response) => {
        const items = response.items;
        setPosts([...items]);
      });
  }, []);

  return (
    <div>
      {posts.map((post: any) => {
        return (
          <div key={post.id + 'div'}>
            <h3 key={post.id + 'title'} className="post_title">{post.title}</h3>
            <p key={post.id + 'timestamp'} className="post_time_stamp">{formatTimeStamp(post.created)}</p>
            <p key={post.id + 'body'} className="post_body">{post.body}</p>
          </div>
        );
      })}
    </div>
  );
}

const placeHolderContent = [{
  id: 1,
  title: "This is palceholder text",
  created: "1969-12-1",
  body: "Some of the biggest expenses in manufacturing (of any product) is the cost of energy to operate. Electricity, steam, fossil fuels are not free to distribute or procure. Facilities need energy to keep the lights on, keep the environment comfortable and safe for the workers, need energy to run the means of production. This is a cost outside the cost of labor, the cost of regulatory/government fees, and outside the cost of raw materials.\n\nEnergy has a cost to procure and consume, but some forms of energy also have a future cost. This cost is obvously polution, let's be real. There's such a wide range of chemical outputs associated with burning stuff which will effect the long term health of civilization as a whole.\n\nNow that I've said this, I claim that most recycling is not worth it. Only the recycling of metals is worth the trouble. Serously think about it, why on earth it is a good idea waste energy turning a water bottle into another water bottle? To turn an empty water bottle into a brand new one it needs to be shipped, chipped, sorted, smelted, reformed, and redistributed back to the bottler. And every one of those steps has a cost, and energy cost.\n\nNow don't be stupid and, I'm sying to throw your plastic bottles away. I'm saying that in the world of 'Reduce, Reuse, Recycle' recycling should be the de-emphasized and de-prioritized. Literally reduce your over consumption. If you do end up with 'single use plastics', just reuse them a few times it won't hurt. And if your so desperate to get rid of that single use plastic, then go ahead and recycle it to make yourself feel better."
}];

function formatTimeStamp(timeStamp: string) {
  const date = new Date(timeStamp);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}
