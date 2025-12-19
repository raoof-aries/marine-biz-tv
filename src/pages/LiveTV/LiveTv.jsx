import { useEffect, useState } from "react";
import { Modal, Loader } from "../../components";
import "./LiveTv.css";

const LiveTv = () => {
  const [currentFilter, setCurrentFilter] = useState("recent");
  const [modalData, setModalData] = useState({
    isOpen: false,
    videoUrl: "",
    title: "",
    isMp4: false,
  });
  const [liveVideoSrc, setLiveVideoSrc] = useState(
    "https://iframes.5centscdn.in/5centscdn/hls/skin1/4petrweaywvuwlxq/aHR0cHM6Ly80M3dyempucHFveGUtaGxzLWxpdmUud21uY2RuLm5ldC9tYXJpbmViaXp0dm1haW4vbWFyaW5lbWFpbi9wbGF5bGlzdC5tM3U4?showcv=true&title=marinebiztvmain/marinemain&autoplay=1&muted=0"
  );
  const [videoArchives, setVideoArchives] = useState([]);
  const [categories, setCategories] = useState([]); // array of { id, name }
  const [loading, setLoading] = useState(true);

  // Helper: detect mp4 & create embed conversion
  const processVideoRecord = (video) => {
    const rawUrl = video.video_url || "";
    let videoUrl = rawUrl;
    let isMp4 = false;

    const urlLower = rawUrl.toLowerCase();

    if (urlLower.includes(".mp4")) {
      isMp4 = true;
      videoUrl = rawUrl;
    } else if (
      urlLower.includes("youtu.be") ||
      urlLower.includes("youtube.com/watch")
    ) {
      try {
        if (urlLower.includes("youtu.be")) {
          const parts = rawUrl.split("/");
          const id = parts[parts.length - 1];
          videoUrl = `https://www.youtube.com/embed/${id}`;
        } else {
          const urlObj = new URL(rawUrl);
          const v = urlObj.searchParams.get("v");
          if (v) videoUrl = `https://www.youtube.com/embed/${v}`;
        }
      } catch (e) {
        videoUrl = rawUrl;
      }
    } else if (urlLower.includes("vimeo.com")) {
      if (
        urlLower.includes("player.vimeo.com") ||
        urlLower.includes("/external/")
      ) {
        videoUrl = rawUrl;
      } else {
        const cleanIdMatch = rawUrl.match(
          /vimeo\.com\/(?:video\/)?(\d+)(?:$|[?#])/
        );
        if (cleanIdMatch && cleanIdMatch[1]) {
          videoUrl = `https://player.vimeo.com/video/${cleanIdMatch[1]}`;
        } else {
          videoUrl = rawUrl;
        }
      }
    } else {
      videoUrl = rawUrl;
    }

    let createdAt = null;
    try {
      createdAt = video.created_at ? new Date(video.created_at) : null;
    } catch (e) {
      createdAt = null;
    }

    return {
      id: video.id,
      title: video.video_title,
      description: video.video_description,
      duration: video.video_duration || "N/A",
      category: String(video.video_type || ""),
      videoUrl,
      rawUrl,
      isMp4,
      thumbnailUrl: video.thumbnail_url,
      createdAt,
    };
  };

  const withAutoplay = (url) => {
    if (!url) return url;
    try {
      const u = new URL(url);
      if (
        u.hostname.includes("youtube.com") &&
        u.pathname.includes("/embed/")
      ) {
        const p = u.searchParams;
        p.set("autoplay", "1");
        p.set("rel", "0");
        return u.toString();
      } else if (u.hostname.includes("player.vimeo.com")) {
        const p = u.searchParams;
        p.set("autoplay", "1");
        return u.toString();
      }
      return url;
    } catch (e) {
      if (url.includes("?")) return `${url}&autoplay=1`;
      return `${url}?autoplay=1`;
    }
  };

  useEffect(() => {
    let canceled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [archivesRes, categoriesRes] = await Promise.all([
          fetch(
            "https://www.marinebiztv.com/admin/api/services.php?action=videoarchives"
          ),
          fetch(
            "https://www.marinebiztv.com/admin/api/services.php?action=videoArchivesCategories"
          ),
        ]);

        const archivesData = await archivesRes.json();
        const categoriesData = await categoriesRes.json();

        if (
          !canceled &&
          categoriesData &&
          categoriesData.status === "success"
        ) {
          const cats = categoriesData.data.map((c) => ({
            id: String(c.id),
            name: c.category_name,
          }));
          setCategories(cats);
        } else {
          setCategories([]);
        }

        if (!canceled && archivesData && archivesData.status === "success") {
          const processed = archivesData.data.map(processVideoRecord);

          processed.sort((a, b) => {
            const ta = a.createdAt ? a.createdAt.getTime() : 0;
            const tb = b.createdAt ? b.createdAt.getTime() : 0;
            return tb - ta;
          });

          setVideoArchives(processed);
        } else {
          setVideoArchives([]);
        }
      } catch (err) {
        console.error("Error fetching LiveTv data:", err);
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const openModal = (archive) => {
    const url = archive.isMp4 ? archive.rawUrl : withAutoplay(archive.videoUrl);
    setModalData({
      isOpen: true,
      videoUrl: url,
      title: archive.title,
      isMp4: archive.isMp4,
    });
    setLiveVideoSrc("");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalData({ isOpen: false, videoUrl: "", title: "", isMp4: false });
    setLiveVideoSrc(
      "https://iframes.5centscdn.in/5centscdn/hls/skin1/kygt6dlsg6zh7rmq/aHR0cHM6Ly80M3dyempucHFveGUtaGxzLWxpdmUud21uY2RuLm5ldC9HQUlQL1RWL3BsYXlsaXN0Lm0zdTg=?showcv=true&title=GAIP/TV&autoplay=1&muted=0"
    );
    document.body.style.overflow = "auto";
  };

  const filteredArchives = (() => {
    if (currentFilter === "recent") {
      return videoArchives.slice(0, 12);
    }
    if (!currentFilter) return [];
    return videoArchives.filter(
      (a) => String(a.category) === String(currentFilter)
    );
  })();

  const visibleCategories = categories.filter((cat) =>
    videoArchives.some((a) => String(a.category) === String(cat.id))
  );

  if (loading) {
    return (
      <Modal>
        <Loader />
      </Modal>
    );
  }

  return (
    <div className="live-tv-wrapper">
      <div className="live-tv-bg-animation">
        <div className="live-tv-orb live-tv-orb-1" />
        <div className="live-tv-orb live-tv-orb-2" />
        <div className="live-tv-orb live-tv-orb-3" />
      </div>

      <div className="live-tv-main-wrapper">
        <section className="live-tv-video-section">
          <div className="live-tv-video-container">
            {liveVideoSrc ? (
              <iframe
                className="live-tv-video-frame"
                src={liveVideoSrc}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Live Stream"
              />
            ) : (
              <div className="live-tv-video-placeholder">
                <p>Click a video to play</p>
              </div>
            )}
          </div>
          <div className="live-tv-scroll-indicator">
            <span>Scroll for Archives</span>
            <span>↓</span>
          </div>
        </section>

        <section className="live-tv-archives-section" id="videoArchives">
          <div className="live-tv-archives-header">
            <h2 className="live-tv-archives-title">Video Archives</h2>

            <div className="live-tv-category-filter">
              <button
                className={`live-tv-filter-button ${
                  currentFilter === "recent" ? "active" : ""
                }`}
                onClick={() => setCurrentFilter("recent")}
              >
                Recent
              </button>

              {visibleCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`live-tv-filter-button ${
                    String(currentFilter) === String(cat.id) ? "active" : ""
                  }`}
                  onClick={() => setCurrentFilter(String(cat.id))}
                >
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="live-tv-archives-grid">
            {filteredArchives && filteredArchives.length > 0 ? (
              filteredArchives.map((archive) => (
                <div
                  key={archive.id}
                  className="live-tv-archive-card visible"
                  onClick={() => openModal(archive)}
                >
                  <div
                    className={`live-tv-card-thumbnail ${
                      !archive.thumbnailUrl ? "no-image" : ""
                    }`}
                    style={
                      archive.thumbnailUrl
                        ? { backgroundImage: `url('${archive.thumbnailUrl}')` }
                        : {}
                    }
                  >
                    {!archive.thumbnailUrl && (
                      <span style={{ fontSize: "2rem" }}>🎥</span>
                    )}

                    <div className="live-tv-card-category">
                      {categories
                        .find((c) => String(c.id) === String(archive.category))
                        ?.name.charAt(0)
                        .toUpperCase() +
                        categories
                          .find(
                            (c) => String(c.id) === String(archive.category)
                          )
                          ?.name.slice(1) || "Uncategorized"}
                    </div>
                  </div>

                  <h3 className="live-tv-card-title">{archive.title}</h3>
                  <p className="live-tv-card-description">
                    {archive.description}
                  </p>
                </div>
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  width: "100%",
                  padding: "2rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                No videos found in this category.
              </p>
            )}
          </div>
        </section>
      </div>

      {modalData.isOpen && (
        <div className="live-tv-modal show" onClick={closeModal}>
          <div
            className="live-tv-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="live-tv-modal-header">
              <h3 className="live-tv-modal-title">{modalData.title}</h3>
              <button className="live-tv-modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="live-tv-modal-video-container">
              {!modalData.isMp4 && (
                <iframe
                  className="live-tv-modal-video"
                  src={modalData.videoUrl}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={modalData.title}
                />
              )}

              {modalData.isMp4 && (
                <video
                  className="live-tv-modal-video"
                  src={modalData.videoUrl}
                  controls
                  autoPlay
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTv;
