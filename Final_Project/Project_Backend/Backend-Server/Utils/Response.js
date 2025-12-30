function createResponse(error,data)
{
    let res = {}

    if(error)
    {
        res.status = "failure"
        res.error = error
        res.data = null
    }
    else
    {
        res.status = "success"
        res.data = data
        res.error = null
    }

    return res
}

module.exports = createResponse