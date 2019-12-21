const router = require('express').Router();
const axios = require('axios');

function qsToJson(qs) {
    var res = {};
    var pars = qs.split('&');
    var kv, k, v;
    for (i in pars) {
        kv = pars[i].split('=');
        k = kv[0];
        v = kv[1];
        res[k] = decodeURIComponent(v);
    }
    return res;
}

async function youTubeVideoInfo(id) {
    var url = 'https://www.youtube.com/get_video_info?html5=1&video_id=' + id;
    const videoInfoResponse = await axios.get(url);
    // if (videoInfoResponse.status != 200) {
    //     throw new Error(`YouTube get video info failed: ${videoInfoResponse.status} - ${videoInfoResponse.statusText}`);
    // }
    var get_video_info = qsToJson(videoInfoResponse.data);
    console.log(get_video_info);

    // remapping urls into an array of objects
    var tmp = get_video_info["url_encoded_fmt_stream_map"];
    if (tmp) {
        tmp = tmp.split(',');
        for (i in tmp) {
            tmp[i] = qsToJson(tmp[i]);
        }
        get_video_info["url_encoded_fmt_stream_map"] = tmp;
    }
    return get_video_info;
}

router.get('/', async function (req, res) {
    var id = req.query.id;
    res.setHeader('Content-Type', 'application/json');
        try {
            youTubeVideoUrl = req.query.url;
            const videoInfo = await youTubeVideoInfo(id);
            if (videoInfo.status === 'failed') {
                throw(new Error(`Failed due to: ${videoInfo.reason}`));
            }
            if (videoInfo && videoInfo.url_encoded_fmt_stream_map) {
                const mp4VideoEntry = videoInfo.url_encoded_fmt_stream_map.find(v => v.type.startsWith('video/mp4'));
                if (!mp4VideoEntry) {
                    throw(new Error(`Failed to resolve mp4 video for ${youTubeVideoUrl}`));
                }
                res.send(`{"success":true,"url":"${mp4VideoEntry.url}"}`);
            } else {
                throw(new Error(`Failed to resolve mp4 video for ${youTubeVideoUrl}`));
            }
        } catch(error) {
            res.send(`{"success":false,"error":"${error.message}"}`);
        }
  
});

module.exports = router;