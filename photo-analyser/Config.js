module.exports = {
    vision: {
        URL: "https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Categories,Tags,Description,Faces,ImageType,Adult&language=en",
        key: "527ba5cd458e407bad738a8987a0a8f2"
    },
    solr: {
        URL: "http://localhost:8983/solr/photoslider/update?commitWithin=1000&overwrite=true&wt=json",
    }
}