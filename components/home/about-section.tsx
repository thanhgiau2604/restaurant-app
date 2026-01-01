'use client'

import AboutImg from '@/assets/view-01.jpg'

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img src={AboutImg.src} alt="Chef cooking" className="h-100 w-full object-cover" />
            </div>
          </div>
          <div className="animate-in fade-in slide-in-from-right duration-700">
            <h2 className="mb-6 text-4xl font-bold text-rose-700 md:text-5xl">Giới Thiệu Quán</h2>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
              Được thành lập vào năm 2026, nhà hàng hầm rượu của chúng tôi được tạo nên như một{' '}
              <strong>
                điểm hẹn lý tưởng cho những buổi giao lưu, tiệc tùng và gặp gỡ thân mật
              </strong>
              . Trong không gian ấm cúng, trầm lắng đặc trưng của hầm rượu, mỗi bữa tiệc trở nên gần
              gũi hơn và mỗi cuộc trò chuyện đều thêm phần trọn vẹn.
            </p>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Thực đơn được xây dựng xoay quanh những món ăn <strong>hấp dẫn, dễ chia sẻ</strong>,
              kết hợp cùng <strong>thức uống và rượu tuyển chọn</strong>, phù hợp cho nhiều phong
              cách thưởng thức – từ gặp gỡ bạn bè, tiếp khách cho đến những buổi tiệc nhóm riêng tư.
              Từng món ăn và ly rượu đều được lựa chọn để làm nổi bật không khí kết nối và tận
              hưởng.
            </p>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Dù là một buổi tối nhẹ nhàng hay một buổi tiệc sôi động, chúng tôi luôn mong muốn mang
              đến <strong>trải nghiệm ẩm thực và thức uống trọn vẹn</strong>, nơi mọi người có thể
              thư giãn, trò chuyện và tận hưởng những khoảnh khắc đáng nhớ bên nhau.
            </p>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="bg-linear-to-r from-orange-500 via-rose-700 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
                  50+
                </div>
                <div className="text-muted-foreground text-sm">Món ăn đặc trưng</div>
              </div>
              <div className="text-center">
                <div className="ffrom-orange-500 bg-linear-to-r via-rose-700 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
                  15+
                </div>
                <div className="text-muted-foreground text-sm">Đa dạng thức uống</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
