/* 
Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
MIT License
Copyright [first edit year]-[latest edit year] Amazon.com, Inc. or its affiliates. All Rights Reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including  without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to  the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN  NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const axios = require('axios')
exports.handler = async (event) => {
    let permission_group = 807657// place this into process.env.permission_group
    let section = 360002159957 // place this into process.env.permission_group
    ticket={"title":event.FullTicket.subject,"body":event.detail.ticket_event.comment.body,"permission_group":permission_group,"section":section}

            try {
                const response = await axios({
                    method:"post",
                    url:`https://${process.env.ZenDeskDomain}.com/api/v2/help_center/sections/${ticket.section}/articles.json`,
                    auth:{
                        username: `${process.env.ZenDeskUsername}/token`,
                        password: process.env.ZenDeskPassword
                    },
                    data: {
                        "article": {
                          "title": ticket.title,
                          "body": ticket.body,
                          "locale": "en-gb",
                          "user_segment_id": null,
                          "permission_group_id": ticket.permission_group
                        },
                        "notify_subscribers": false
                      }
                })
                const results = response.data
                return {
                    statusCode: 200,
                    body: results
                }
            } catch (err) {
		        console.error(err)
	        }
    }