import * as functions from "firebase-functions";
import axios from "axios";
import {load} from "cheerio";


const getOGP = functions
    .region("asia-northeast1")
    .firestore
    .document("bookmark/{bookmarkId}")
    .onCreate(async (snap, context) => {
      const data = snap.data();
      try {
        if (data.url === undefined) {
          snap.ref.set(
              {
                isError: true,
              }, {merge: true}
          );
          return;
        }
        const res = await axios.get(data.url, {headers: {"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}} );
        const $ = load(res.data); // 結果をcheerioでパース
        const url = $("meta[property='og:url']").attr("content");
        const ogpDescription =
        $("meta[property='og:description']").attr("content");
        const keywords = $("meta[name='keywords']").attr("content");
        const siteName = $("meta[property='og:site_name']").attr("content");
        const title = $("meta[property='og:title']").attr("content");
        const imageUrl = $("meta[property='og:image']").attr("content");
        const type = $("meta[property='og:type']").attr("content");
        const locale = $("meta[property='og:locale']").attr("content");
        const description = $("meta[name='description']").attr("content");

        const body= $.html($("body"));
        const html= $.html();
        snap.ref.set(
            {
              url: url ? url : null,
              description: description ? description : null,
              keywords: keywords ? keywords : null,
              siteName: siteName ? siteName : null,
              title: title ? title : null,
              imageUrl: imageUrl ? imageUrl : null,
              type: type ? type : null,
              locale: locale ? locale : null,
              ogpDescription: ogpDescription ? ogpDescription : null,
              body: body ? body : null,
              html: html ? html : null,
              isError: false,
            }, {merge: true}
        );
      } catch (e) {
        snap.ref.set(
            {
              isError: true,
            }, {merge: true}
        );
      }
    });

export default {getOGP};
