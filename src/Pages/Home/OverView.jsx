import React from 'react';

const OverView = () => {
    return (
        <div className="md:mx-20 mx-10 lg:mx-0">
            <h1 className="text-2xl font-bold mb-5 text-center">This is Overview</h1>
            
            <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                    src="https://player.vimeo.com/video/1047787717?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                    title="Bangladesh Tourist Places: 11 Places to Visit in Bangladesh (Travel Guide)"
                ></iframe>
            </div>

            <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
    );
};

export default OverView;
