import { useCallback, useRef, useState, useEffect } from "react";
import "./styles.css";
import { parseLinkHeader } from "./parseLinkHeader";

function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nextPage = useRef();

  const photoRef = useCallback((element) => {
    const lastElementObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        lastElementObserver.unobserve(entries[0].target);
        if (nextPage.current) {
          startPhotoFetch(nextPage.current);
        }
      }
    });
    if (element == null) return;
    lastElementObserver.observe(element);
  }, []);

  const startPhotoFetch = async (url) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(10);
        }, 2000)
      );
      const responseData = await fetch(url);
      const data = await responseData.json();
      const pagination = parseLinkHeader(responseData.headers.get("link"));
      setPhotos((currPhotos) => [...currPhotos, ...data]);
      nextPage.current = pagination.next;
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startPhotoFetch("http://127.0.0.1:3000/photos-short-list?_page=1&_limit=6");
  }, []);

  return (
    <div className="grid">
      {photos.map((photo, index) => {
        if (index == photos.length - 1) {
          return <img src={photo.url} key={photo.id} ref={photoRef} />;
        }
        return <img src={photo.url} key={photo.id} />;
      })}
      {isLoading && (
        <>
          {" "}
          <div className="skeleton">Loading...</div>
          <div className="skeleton">Loading...</div>
          <div className="skeleton">Loading...</div>
          <div className="skeleton">Loading...</div>
          <div className="skeleton">Loading...</div>
          <div className="skeleton">Loading...</div>
        </>
      )}
    </div>
  );
}

export default App;
