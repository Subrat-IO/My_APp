import './sidebar.css'

export default function SideBar() {
    return (
        <section className="sidebar">
            {/* Top Left Logo */}
            <div className="top-section">
                <img className="logo" src="/src/assets/ChatGPT-Logo.png" alt="ChatGPT Logo" />
            </div>

            {/* New Chat Button */}
            <button className="new-chat">
               <img className='new-chat-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABbElEQVR4AdSVPUoEMRiGRy20FARF7ETQygt4ATs7G8EbaKWgjT+NgtqpR7D15wriDURUEAsrFSw8gD/POzsJSXYyZIbdhV3eJ/mSL/neTAZ2BrMu//rK4JjL2ABP4RMskX2Evwp+yK2Aq1MGKt5mEhqcs3AOYvolsQoXYDROsAxGMtkyg9BgqkgM0JcxxLxbfJTxJyzAOxjpIHkcGuSTiY2u5Im10/ACMvmgX4MjyNXUQFegq5igyh3MwCvMwhlYNTHYZvchGE0S3MIYfIOnuga6lgOvQmug9/LVCv22joGK61r8Cll2wsQmGC2aQH2qwR6LU4tfsdYqxWCX1YLOU3hyJa9pRsAqxUCntxuKoKy4UsNqXFIM3PWKZejeueai1DVQ4f1otZJEioH7l6GrKSkTn0oxiO9OyPTc4K04VNX3oCqn7Q9qDOETrJN4hqa6Z+MOWIUGN2T0wXFfbJ14nv2XYBUa2ESngq4b/AMAAP//8OC7igAAAAZJREFUAwDGXUIxErFK6gAAAABJRU5ErkJggg=="/>
                <span>New Chat</span>
            </button>

            {/* Chat History */}
            <ul className="History">
                <li>React Project Discussion</li>
                <li>Portfolio Design</li>
                <li>Astrology Site Plan</li>
            </ul>

            {/* Footer / Sign */}
            <div className="sign">
                <p>By Subrat Sethi ❤️</p>
            </div>
        </section>
    )
}
