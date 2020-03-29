let links_file = "../mocks/links.json";

function getLinks(req, res) {
    let all_links = require(links_file);
    let res_data;

    let links = all_links[req.session.username] || all_links["default"];
    if (req.params.type == "news") {
        res_data = links.news;
    } else if (req.params.type == "tech") {
        res_data = links.tech;
    } else if (req.params.type == "top") {
        res_data = links.top;
    } else if (req.params.type == undefined) {
        res_data = links;
    }
    res.json(res_data);
}

module.exports = {
    getLinks: getLinks
}