var myswiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination'
    }
});
var pages = 1;
$.ajax({
    url: '/api/data',
    success: function(data) {
        var obj = JSON.parse(data);
        if (obj.code == 0) {
            var str1 = '';
            var str2 = '';
            var str3 = '';
            obj.data.list1.forEach(function(file) {
                str1 += `<li><img src="${file.img}" alt=""><span>${file.title}</span></li>`
            });
            obj.data.list2.forEach(function(file) {
                str2 += `<li><img src="${file.img}" alt=""><span>${file.title}</span></li>`
            })
            obj.data.food.forEach(function(file) {
                str3 += `<li>
                <div class="des">
                    <img src="${file.img}" alt="">
                    <div class="info">
                        <div class="info-t">
                            <h3>${file.title}</h3>
                            <span>${file.des}</span>
                        </div>
                        <p>
                            <span><b>${file.price}</b>元</span>
                            <em>门市价<i>${file.shopPrice}</i>元</em>
                        </p>
                    </div>
                </div>
                <div class="count">
                    <span>已售<em>${file.num}</em></span>
                </div>
            </li>`;
            })
            $('.list1').html(str1);
            $('.list2').html(str2);
            $('.food').html(str3);
            var myBScroll = new BScroll('.scroll', {
                probeType: 2
            });

            // myBScroll.on('scroll', function() {
            //         if (this.y > $('.pulldown').height()) {
            //             $('.pulldown').html('释放刷新').addClass('filp');
            //         } else if (this.y > 40) {
            //             $('.pulldown').html('下拉刷新').removeClass('flip');
            //         } else if (this.y < this.maxScrollY - $('.pullup').height()) {
            //             if (pages <= 3) {
            //                 $('.pullup').html('上拉加载').removeClass('filp');
            //             } else {
            //                 $('.pullup').html('--我也是有底线的--');
            //             }
            //         }
            //     })
            // myBScroll.on('scrollEnd', function() {
            //     if ($('.pulldown').hasClass('flip')) {
            //         $.ajax({
            //             url: '/api/data',
            //             success: function(data) {
            //                 var obj = JSON.parse(data);
            //                 if (obj.code == 0) {
            //                     var str3 = '';
            //                     obj.data.food.forEach(function(file) {
            //                         str3 += `<li>
            //                         <div class="des">
            //                             <img src="${file.img}" alt="">
            //                             <div class="info">
            //                                 <div class="info-t">
            //                                     <h3>${file.title}</h3>
            //                                     <span>${file.des}</span>
            //                                 </div>
            //                                 <p>
            //                                     <span><b>${file.price}</b>元</span>
            //                                     <em>门市价<i>${file.shopPrice}</i>元</em>
            //                                 </p>
            //                             </div>
            //                         </div>
            //                         <div class="count">
            //                             <span>已售<em>${file.num}</em></span>
            //                         </div>
            //                     </li>`;
            //                     })
            //                     $('.food').html(str3);
            //                 }
            //             }
            //         })
            //         $('.pulldown').html('下拉刷新').removeClass('flip');
            //     } else if ($('.pullup').hasClass('filp')) {
            //         if (pages <= 3) {
            //             pages++;
            //             $.ajax({
            //                 url: '/api/data',
            //                 success: function(data) {
            //                     var obj = JSON.parse(data);
            //                     if (obj.code == 0) {
            //                         var str3 = $('.food').html();
            //                         obj.data.food.forEach(function(file) {
            //                             str3 += `<li>
            //                             <div class="des">
            //                                 <img src="${file.img}" alt="">
            //                                 <div class="info">
            //                                     <div class="info-t">
            //                                         <h3>${file.title}</h3>
            //                                         <span>${file.des}</span>
            //                                     </div>
            //                                     <p>
            //                                         <span><b>${file.price}</b>元</span>
            //                                         <em>门市价<i>${file.shopPrice}</i>元</em>
            //                                     </p>
            //                                 </div>
            //                             </div>
            //                             <div class="count">
            //                                 <span>已售<em>${file.num}</em></span>
            //                             </div>
            //                         </li>`;
            //                         })
            //                         $('.food').html(str3);
            //                     }
            //                 }
            //             })
            //             $('.pullup').html('上拉加载').removeClass('flip');
            //         } else {
            //             $('.pullup').html('--我也是有底线的--');
            //         }
            //     }
            // })
        }
    }
})
var timer = null;
$('form input').on('input', function() {
    var val = $(this).val();
    clearTimeout(timer);
    if (val) {
        timer = setTimeout(function() {
            $.ajax({
                url: '/api/data',
                success: function(data) {
                    var obj = JSON.parse(data);
                    var str = '';
                    obj.data.news.forEach(function(file) {
                        if (file.title.indexOf(val) != -1) {
                            str += `<li>${file.title}</li>`;
                        }
                    })
                    $('.news').html(str);
                }
            })
        }, 200)
    }

})