'use client'

import VipRoomImg from '@/assets/viproom.jpg'
import RooftopImg from '@/assets/rootop.jpg'
import AlacarteImg from '@/assets/alacarte.jpg'

export default function AboutSection() {
  return (
    <section id="about" className="overflow-hidden bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="animate-in fade-in slide-in-from-bottom mb-12 text-center duration-700">
          <h2 className="text-secondary mb-4 text-4xl font-bold md:text-5xl">Giới Thiệu</h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
            Chúng tôi xây dựng không gian theo nhiều phong cách để phù hợp với từng nhu cầu: từ buổi
            gặp gỡ thân mật, tiệc riêng sang trọng, đến các sự kiện quy mô lớn ngoài trời. Mỗi khu
            vực đều được chăm chút về tiện nghi, sức chứa và trải nghiệm, giúp quý khách luôn cảm
            thấy thoải mái và trọn vẹn.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10">
          <div className="animate-in fade-in slide-in-from-left overflow-hidden rounded-2xl bg-white shadow-xl duration-700 md:flex md:items-stretch">
            <div className="overflow-hidden md:w-5/12">
              <img
                src={VipRoomImg.src}
                alt="Hầm rượu VIP"
                className="h-72 w-full object-cover md:h-full"
              />
            </div>
            <div className="space-y-3 p-6 md:w-7/12 md:p-10 md:text-left">
              <h3 className="text-secondary text-2xl font-bold">Hầm rượu VIP</h3>
              <p className="text-muted-foreground leading-relaxed">
                Không gian riêng tư với wifi, âm thanh, máy lạnh và nhà vệ sinh riêng biệt. Sức chứa
                lên đến 100 khách, phù hợp cho tiệc riêng, gặp gỡ đối tác hoặc các buổi gặp mặt thân
                mật cần sự yên tĩnh và sang trọng.
              </p>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom overflow-hidden rounded-2xl bg-white shadow-xl duration-700 md:flex md:flex-row-reverse md:items-stretch">
            <div className="overflow-hidden md:w-5/12">
              <img
                src={RooftopImg.src}
                alt="Sân thượng Sky"
                className="h-72 w-full object-cover md:h-full"
              />
            </div>
            <div className="space-y-3 p-6 md:w-7/12 md:p-10 md:text-right">
              <h3 className="text-secondary text-2xl font-bold">Sân thượng Sky</h3>
              <p className="text-muted-foreground leading-relaxed">
                Không gian thoáng mát, tầm nhìn mở, lý tưởng cho các sự kiện ngoài trời. Sân thượng
                có thể đón đến 300 khách, phù hợp tổ chức sinh nhật, tiệc công ty hoặc chương trình
                theo yêu cầu.
              </p>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right overflow-hidden rounded-2xl bg-white shadow-xl duration-700 md:flex md:items-stretch">
            <div className="overflow-hidden md:w-5/12">
              <img
                src={AlacarteImg.src}
                alt="Sảnh Alacarte"
                className="h-72 w-full object-cover md:h-full"
              />
            </div>
            <div className="space-y-3 p-6 md:w-7/12 md:p-10 md:text-left">
              <h3 className="text-secondary text-2xl font-bold">Sảnh Alacarte</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sảnh rộng rãi, sức chứa khoảng 300 khách, trang bị màn hình máy chiếu phục vụ các
                giải bóng đá. Phù hợp cho gia đình, nhóm bạn và các buổi họp mặt đông người.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
