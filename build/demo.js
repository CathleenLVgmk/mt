"use strict";var myswiper=new Swiper(".swiper-container",{pagination:{el:".swiper-pagination"}}),pages=1;function more(){$.ajax({url:"/api/data",success:function(n){var a=JSON.parse(n);if(0==a.code){var i=$(".food").html();a.data.food.forEach(function(n){i+='<li>\n                                    <div class="des">\n                                        <img src="'.concat(n.img,'" alt="">\n                                        <div class="info">\n                                            <div class="info-t">\n                                                <h3>').concat(n.title,"</h3>\n                                                <span>").concat(n.des,"</span>\n                                            </div>\n                                            <p>\n                                                <span><b>").concat(n.price,"</b>元</span>\n                                                <em>门市价<i>").concat(n.shopPrice,'</i>元</em>\n                                            </p>\n                                        </div>\n                                    </div>\n                                    <div class="count">\n                                        <span>已售<em>').concat(n.num,"</em></span>\n                                    </div>\n                                </li>")}),$(".food").html(i)}}})}function refresh(){$.ajax({url:"/api/data",success:function(n){var a=JSON.parse(n);if(0==a.code){var i="";a.data.food.forEach(function(n){i+='<li>\n                                    <div class="des">\n                                        <img src="'.concat(n.img,'" alt="">\n                                        <div class="info">\n                                            <div class="info-t">\n                                                <h3>').concat(n.title,"</h3>\n                                                <span>").concat(n.des,"</span>\n                                            </div>\n                                            <p>\n                                                <span><b>").concat(n.price,"</b>元</span>\n                                                <em>门市价<i>").concat(n.shopPrice,'</i>元</em>\n                                            </p>\n                                        </div>\n                                    </div>\n                                    <div class="count">\n                                        <span>已售<em>').concat(n.num,"</em></span>\n                                    </div>\n                                </li>")}),$(".food").html(i)}}})}$.ajax({url:"/api/data",success:function(n){var a=JSON.parse(n);if(0==a.code){var i="",s="",c="";a.data.list1.forEach(function(n){i+='<li><img src="'.concat(n.img,'" alt=""><span>').concat(n.title,"</span></li>")}),a.data.list2.forEach(function(n){s+='<li><img src="'.concat(n.img,'" alt=""><span>').concat(n.title,"</span></li>")}),a.data.food.forEach(function(n){c+='<li>\n                <div class="des">\n                    <img src="'.concat(n.img,'" alt="">\n                    <div class="info">\n                        <div class="info-t">\n                            <h3>').concat(n.title,"</h3>\n                            <span>").concat(n.des,"</span>\n                        </div>\n                        <p>\n                            <span><b>").concat(n.price,"</b>元</span>\n                            <em>门市价<i>").concat(n.shopPrice,'</i>元</em>\n                        </p>\n                    </div>\n                </div>\n                <div class="count">\n                    <span>已售<em>').concat(n.num,"</em></span>\n                </div>\n            </li>")}),$(".list1").html(i),$(".list2").html(s),$(".food").html(c);var t=new BScroll("section",{probeType:2,click:!0});t.on("scroll",function(){3<=pages?$("#down").html("我也是有底线的"):this.y<this.maxScrollY-50?$("#down").html("上拉加载更多").addClass("filp"):this.y<this.maxScrollY-20?$("#down").html("上拉加载").removeClass("filp"):50<this.y?$("#up").html("释放刷新").addClass("filp"):20<this.y&&$("#up").html("下拉刷新").removeClass("filp")}),t.on("scrollEnd",function(){$("#down").hasClass("filp")?($("#down").html("上拉加载").removeClass("filp"),++pages<=3&&more()):$("#up").hasClass("filp")&&($("#up").html("下拉刷新").removeClass("filp"),refresh())})}}});var timer=null;$("form input").on("input",function(){var s=$(this).val();clearTimeout(timer),s&&(timer=setTimeout(function(){$.ajax({url:"/api/data",success:function(n){var a=JSON.parse(n),i="";a.data.news.forEach(function(n){-1!=n.title.indexOf(s)&&(i+="<li>".concat(n.title,"</li>"))}),$(".news").html(i)}})},200))}),$("footer ul").on("click","li",function(){$(this).addClass("active").siblings().removeClass("active")});