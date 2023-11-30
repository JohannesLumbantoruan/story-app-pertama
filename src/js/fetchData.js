async function fetchData() {
    const res = await fetch('/data/DATA.json');
    const json = await res.json();
    const stories = json.listStory

    return stories;
}

fetchData();