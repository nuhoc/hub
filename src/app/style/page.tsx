export default async function Style() {
    const styles = [
        "bg-white text-black p-8",
        "bg-primary text-white p-8",
        "bg-white text-primary p-8",
    ]
    return <div className=" w-full h-full">
        <h1 className="bg-white text-primary text-center p-8">Styling Guide</h1>
        {styles.map((style) =>
            <div className={style}>
                <h1>Heading 1 (One)</h1>
                <h2>Heading 2 (Two)</h2>
                <h3>Heading 3 (Three)</h3>
                <h4>Heading 4 (Four)</h4>
                <h5>Heading 5 (Five)</h5>
                <h6>Heading 6 (Six)</h6>
                <p><strong>Subtitle 1 (One)</strong></p>
                <p><b>Subtitle 2 (Two)</b></p>
                <p>Body 1 (One)</p>
                <p><small>Body 2 (Two)</small></p>
                <button>Button</button>
                <caption>Caption</caption>
                <u>Overline</u>
            </div>)
        }

    </div>
}