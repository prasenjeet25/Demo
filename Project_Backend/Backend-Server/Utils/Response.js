function createResponse(error,data)
{
    let res = {}

    if(error)
    {
        res.status = "failure"
        res.error = error
    }
    res.status = "success"
    res.data = data

    return res
}

module.exports = createResponse