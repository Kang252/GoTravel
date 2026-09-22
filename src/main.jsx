import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, BadgePercent, BedDouble, CalendarDays, Check, ChevronDown,
  ChevronRight, CircleUserRound, Clock3, Compass, CreditCard, Heart,
  Building2, Globe2, MapPin, Menu, Minus, Mountain, PackageCheck, Phone, Plane,
  Play, Plus, Search, ShieldCheck, ShoppingBag, Sparkles, Star, Ticket, Users,
  Waves, Wifi, X
} from 'lucide-react';
import './styles.css';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=88',
  halong: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=82',
  hoian: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?auto=format&fit=crop&w=900&q=82',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82',
  japan: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=82',
  thailand: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=82',
  paris: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=82',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=82',
  resort: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=82',
  travel: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=82',
  camp: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=82',
};

const tours = [
  { id: 1, title: 'Hạ Long · Ninh Bình · Hà Nội', place: 'Miền Bắc', destination: 'Việt Nam', area: 'Miền Bắc', country: 'Việt Nam', days: '4N3Đ', departure: 'TP. Hồ Chí Minh', date: '12/10', price: 6790000, old: 7590000, rating: 4.9, reviews: 128, seats: 6, tag: 'Bán chạy', image: IMG.halong },
  { id: 2, title: 'Hội An · Bà Nà · Huế mộng mơ', place: 'Miền Trung', destination: 'Việt Nam', area: 'Miền Trung', country: 'Việt Nam', days: '4N3Đ', departure: 'Hà Nội', date: '18/10', price: 6290000, old: 6990000, rating: 4.8, reviews: 94, seats: 9, tag: 'Go deal', image: IMG.hoian },
  { id: 3, title: 'Phú Quốc · Hoàng hôn Địa Trung Hải', place: 'Miền Nam', destination: 'Việt Nam', area: 'Miền Nam', country: 'Việt Nam', days: '3N2Đ', departure: 'TP. Hồ Chí Minh', date: '25/10', price: 4890000, old: 5490000, rating: 4.9, reviews: 211, seats: 4, tag: 'Còn ít chỗ', image: IMG.beach },
  { id: 4, title: 'Tokyo · Fuji · Kawaguchiko mùa thu', place: 'Nhật Bản', destination: 'Nhật Bản', area: 'Tokyo & Fuji', country: 'Quốc tế', days: '6N5Đ', departure: 'TP. Hồ Chí Minh', date: '03/11', price: 28990000, old: 31500000, rating: 4.9, reviews: 76, seats: 8, tag: 'Visa dễ', image: IMG.japan },
  { id: 5, title: 'Bangkok · Pattaya · Đảo Coral', place: 'Thái Lan', destination: 'Thái Lan', area: 'Bangkok', country: 'Quốc tế', days: '5N4Đ', departure: 'Hà Nội', date: '09/11', price: 8990000, old: 9990000, rating: 4.7, reviews: 103, seats: 12, tag: 'Giờ chót', image: IMG.thailand },
  { id: 6, title: 'Paris · Lucerne · Milan kinh điển', place: 'Châu Âu', destination: 'Châu Âu', area: 'Tây Âu', country: 'Quốc tế', days: '10N9Đ', departure: 'TP. Hồ Chí Minh', date: '16/11', price: 67900000, old: 72500000, rating: 4.9, reviews: 42, seats: 5, tag: 'Trọn gói', image: IMG.paris },
  { id: 7, title: 'Đà Lạt · Đồi chè · Săn mây', place: 'Tây Nguyên', destination: 'Việt Nam', area: 'Tây Nguyên', country: 'Việt Nam', days: '3N2Đ', departure: 'TP. Hồ Chí Minh', date: '02/11', price: 3990000, old: 4590000, rating: 4.8, reviews: 86, seats: 10, tag: 'Mới', image: IMG.camp },
  { id: 8, title: 'Kyoto · Osaka · Nara cổ kính', place: 'Nhật Bản', destination: 'Nhật Bản', area: 'Kansai', country: 'Quốc tế', days: '6N5Đ', departure: 'Hà Nội', date: '20/11', price: 30900000, old: 33500000, rating: 4.9, reviews: 61, seats: 7, tag: 'Mùa lá đỏ', image: IMG.japan },
  { id: 9, title: 'Hokkaido · Sapporo mùa tuyết', place: 'Nhật Bản', destination: 'Nhật Bản', area: 'Hokkaido', country: 'Quốc tế', days: '6N5Đ', departure: 'TP. Hồ Chí Minh', date: '08/12', price: 34900000, old: 37900000, rating: 4.8, reviews: 54, seats: 9, tag: 'Mùa đông', image: IMG.japan },
  { id: 10, title: 'Chiang Mai · Chiang Rai bình yên', place: 'Thái Lan', destination: 'Thái Lan', area: 'Chiang Mai', country: 'Quốc tế', days: '4N3Đ', departure: 'TP. Hồ Chí Minh', date: '14/11', price: 8290000, old: 9290000, rating: 4.8, reviews: 72, seats: 11, tag: 'Văn hóa', image: IMG.thailand },
  { id: 11, title: 'Phuket · Phi Phi · Vịnh Phang Nga', place: 'Thái Lan', destination: 'Thái Lan', area: 'Phuket', country: 'Quốc tế', days: '5N4Đ', departure: 'TP. Hồ Chí Minh', date: '28/11', price: 10900000, old: 11900000, rating: 4.9, reviews: 119, seats: 6, tag: 'Biển đảo', image: IMG.beach },
  { id: 12, title: 'Ý · Thụy Sĩ · Pháp lãng mạn', place: 'Châu Âu', destination: 'Châu Âu', area: 'Nam Âu', country: 'Quốc tế', days: '11N10Đ', departure: 'Hà Nội', date: '22/11', price: 69900000, old: 75900000, rating: 4.9, reviews: 38, seats: 7, tag: 'Cung mới', image: IMG.paris },
  { id: 13, title: 'Đức · Áo · Séc mùa Giáng sinh', place: 'Châu Âu', destination: 'Châu Âu', area: 'Trung Âu', country: 'Quốc tế', days: '10N9Đ', departure: 'TP. Hồ Chí Minh', date: '05/12', price: 72900000, old: 78900000, rating: 4.8, reviews: 31, seats: 8, tag: 'Noel', image: IMG.paris },
];

const featuredTours = tours.slice(0, 6);

const heroSlides = [
  { image: IMG.hero, kicker: 'Du lịch theo cách của bạn', line1: 'Đi để thấy', accent: 'mình mới.', text: 'Những hành trình được tuyển chọn để mỗi chuyến đi là một câu chuyện đáng nhớ.', badge: 'Khám phá Việt Nam' },
  { image: IMG.japan, kicker: 'Mùa thu chạm ngõ', line1: 'Nhật Bản', accent: 'đẹp như mơ.', text: 'Tokyo sôi động, Fuji bình yên và những cung đường nhuộm màu lá đỏ.', badge: 'Từ 28.990.000đ' },
  { image: IMG.beach, kicker: 'Chạm vào mùa xanh', line1: 'Trốn đến biển,', accent: 'thở thật sâu.', text: 'Nắng trong, cát mịn và một kỳ nghỉ không cần vội tại đảo ngọc.', badge: 'Combo từ 4.890.000đ' },
];

const megaGroups = [
  { title: 'Tour trong nước', icon: MapPin, links: ['Miền Bắc', 'Miền Trung', 'Miền Nam', 'Miền Tây', 'Tour trong ngày', 'Tour hành hương'] },
  { title: 'Tour nước ngoài', icon: Globe2, links: ['Nhật Bản', 'Hàn Quốc', 'Trung Quốc', 'Thái Lan', 'Châu Âu', 'Úc · Mỹ · Phi'] },
  { title: 'Tour theo nhu cầu', icon: Users, links: ['Tour khách đoàn', 'Tour MICE', 'Teambuilding', 'Tour gia đình', 'Tour trekking', 'Tour thiết kế riêng'] },
  { title: 'Dịch vụ du lịch', icon: PackageCheck, links: ['Vé máy bay', 'Khách sạn', 'Vé vui chơi', 'Dịch vụ visa', 'eSIM quốc tế', 'Combo tiết kiệm'] },
];

const travelServices = [
  { title: 'Tour trọn gói', desc: 'Nội địa & quốc tế', icon: Compass, tone: 'red', links: ['Tour giờ chót', 'Tour lễ · Tết', 'Tour mùa hoa'] },
  { title: 'Vé máy bay', desc: 'So sánh giá nhanh', icon: Plane, tone: 'blue', links: ['Nội địa', 'Quốc tế', 'Nhiều chặng'] },
  { title: 'Khách sạn', desc: 'Hơn 12.000 lựa chọn', icon: Building2, tone: 'navy', links: ['Resort', 'Khách sạn 5 sao', 'Villa'] },
  { title: 'Vé vui chơi', desc: 'Vào cổng không xếp hàng', icon: Ticket, tone: 'cyan', links: ['Sun World', 'VinWonders', 'Show diễn'] },
  { title: 'Visa du lịch', desc: 'Hồ sơ gọn, hỗ trợ nhanh', icon: ShieldCheck, tone: 'purple', links: ['Châu Á', 'Châu Âu', 'Mỹ · Úc'] },
  { title: 'eSIM quốc tế', desc: 'Kết nối ngay khi hạ cánh', icon: Wifi, tone: 'green', links: ['Châu Á', 'Châu Âu', 'Toàn cầu'] },
  { title: 'Combo du lịch', desc: 'Bay + phòng + trải nghiệm', icon: PackageCheck, tone: 'orange', links: ['Biển đảo', 'City break', 'Trăng mật'] },
  { title: 'Tour trekking', desc: 'Chạm vào thiên nhiên', icon: Mountain, tone: 'forest', links: ['Tà Năng', 'Fansipan', 'Cung đường mới'] },
];

const pageCatalog = {
  'tour-trong-nuoc': { eyebrow: 'Việt Nam rực rỡ', title: 'Tour trong nước', subtitle: 'Từ núi cao đến biển xanh, khám phá Việt Nam theo cách trọn vẹn nhất.', image: IMG.halong, tabs: ['Tất cả', 'Miền Bắc', 'Miền Trung', 'Miền Nam', 'Miền Tây'], type: 'tour' },
  'tour-nuoc-ngoai': { eyebrow: 'Ra thế giới', title: 'Tour nước ngoài', subtitle: 'Hành trình chọn lọc đến những điểm đến đáng mơ ước trên toàn cầu.', image: IMG.japan, tabs: ['Tất cả', 'Châu Á', 'Châu Âu', 'Úc · Mỹ', 'Châu Phi'], type: 'tour' },
  'tour-khach-doan': { eyebrow: 'Đi cùng nhau', title: 'Tour khách đoàn & MICE', subtitle: 'Lịch trình thiết kế riêng cho doanh nghiệp, gia đình và tập thể.', image: IMG.camp, tabs: ['Doanh nghiệp', 'Teambuilding', 'MICE', 'Gia đình'], type: 'group' },
  'tour-trong-ngay': { eyebrow: 'Đi gần, vui nhiều', title: 'Tour trong ngày', subtitle: 'Những chuyến trốn phố ngắn gọn, đủ đầy trải nghiệm.', image: IMG.hoian, tabs: ['Từ TP.HCM', 'Từ Hà Nội', 'Từ Đà Nẵng'], type: 'tour' },
  'tour-hanh-huong': { eyebrow: 'Hành trình an nhiên', title: 'Tour hành hương', subtitle: 'Không gian văn hóa và tâm linh được dẫn dắt chu đáo.', image: IMG.thailand, tabs: ['Trong nước', 'Châu Á', 'Châu Âu'], type: 'tour' },
  'tour-trekking': { eyebrow: 'Chạm thiên nhiên', title: 'Tour trekking', subtitle: 'Cung đường thử thách vừa đủ, dẫn đoàn an toàn và giàu trải nghiệm.', image: IMG.camp, tabs: ['Dễ', 'Trung bình', 'Nâng cao'], type: 'tour' },
  've-may-bay': { eyebrow: 'Bay khắp nơi', title: 'Vé máy bay', subtitle: 'So sánh hành trình, chọn giờ bay và mức giá phù hợp.', image: IMG.travel, tabs: ['Một chiều', 'Khứ hồi', 'Nhiều chặng'], type: 'flight' },
  'khach-san': { eyebrow: 'Ở thật phong cách', title: 'Khách sạn & resort', subtitle: 'Từ boutique giữa phố đến resort bên biển, tất cả trong một lần tìm.', image: IMG.resort, tabs: ['Khách sạn', 'Resort', 'Villa', 'Homestay'], type: 'hotel' },
  've-vui-choi': { eyebrow: 'Chơi không giới hạn', title: 'Vé vui chơi', subtitle: 'Đặt trước vé tham quan, show diễn và công viên chủ đề.', image: IMG.bali, tabs: ['Công viên', 'Show diễn', 'Bảo tàng', 'Thể thao'], type: 'ticket' },
  'dich-vu-visa': { eyebrow: 'Đi xa thật dễ', title: 'Dịch vụ visa', subtitle: 'Tư vấn hồ sơ rõ ràng, theo dõi tiến độ minh bạch.', image: IMG.paris, tabs: ['Châu Á', 'Châu Âu', 'Mỹ', 'Úc'], type: 'visa' },
  'esim-quoc-te': { eyebrow: 'Luôn kết nối', title: 'eSIM quốc tế', subtitle: 'Kích hoạt nhanh, online ngay khi máy bay hạ cánh.', image: IMG.japan, tabs: ['Châu Á', 'Châu Âu', 'Mỹ · Úc', 'Toàn cầu'], type: 'esim' },
  'combo-tiet-kiem': { eyebrow: 'Đặt chung, giá tốt', title: 'Combo du lịch', subtitle: 'Vé bay, phòng nghỉ và trải nghiệm được đóng gói thông minh.', image: IMG.beach, tabs: ['Biển đảo', 'City break', 'Trăng mật', 'Gia đình'], type: 'combo' },
  'diem-den': { eyebrow: 'Bản đồ cảm hứng', title: 'Điểm đến', subtitle: 'Chọn một nơi bạn yêu, GoTravel lo phần còn lại.', image: IMG.hoian, tabs: ['Việt Nam', 'Châu Á', 'Châu Âu', 'Úc · Mỹ'], type: 'destination' },
  'diem-den-viet-nam': { eyebrow: 'Việt Nam rực rỡ', title: 'Du lịch Việt Nam', subtitle: 'Từ di sản miền Trung, kỳ quan miền Bắc đến những bãi biển phương Nam.', image: IMG.halong, tabs: ['Tất cả', 'Miền Bắc', 'Miền Trung', 'Miền Nam', 'Tây Nguyên'], type: 'destination', destinationFilter: 'Việt Nam' },
  'diem-den-nhat-ban': { eyebrow: 'Xứ sở mặt trời mọc', title: 'Du lịch Nhật Bản', subtitle: 'Sắc màu bốn mùa, đô thị hiện đại và nét văn hóa tinh tế đầy cuốn hút.', image: IMG.japan, tabs: ['Tất cả', 'Tokyo & Fuji', 'Kansai', 'Hokkaido'], type: 'destination', destinationFilter: 'Nhật Bản' },
  'diem-den-thai-lan': { eyebrow: 'Nụ cười Đông Nam Á', title: 'Du lịch Thái Lan', subtitle: 'Ẩm thực sôi động, đền chùa rực rỡ và những hòn đảo trong xanh.', image: IMG.thailand, tabs: ['Tất cả', 'Bangkok', 'Chiang Mai', 'Phuket'], type: 'destination', destinationFilter: 'Thái Lan' },
  'diem-den-chau-au': { eyebrow: 'Châu Âu kinh điển', title: 'Du lịch Châu Âu', subtitle: 'Những thành phố biểu tượng, cung đường lãng mạn và nền văn hóa lâu đời.', image: IMG.paris, tabs: ['Tất cả', 'Tây Âu', 'Trung Âu', 'Nam Âu'], type: 'destination', destinationFilter: 'Châu Âu' },
  'trai-nghiem': { eyebrow: 'Travel different', title: 'Trải nghiệm', subtitle: 'Hoạt động bản địa giúp bạn sống sâu hơn trong từng chuyến đi.', image: IMG.bali, tabs: ['Ẩm thực', 'Văn hóa', 'Thiên nhiên', 'Phiêu lưu'], type: 'experience' },
  'cam-nang': { eyebrow: 'Đi thông thái', title: 'Cẩm nang du lịch', subtitle: 'Gợi ý, lịch trình và kinh nghiệm thực tế cho chuyến đi tự tin hơn.', image: IMG.travel, tabs: ['Kinh nghiệm', 'Ẩm thực', 'Điểm đến', 'Mẹo hay'], type: 'story' },
  've-gotravel': { eyebrow: 'Câu chuyện GoTravel', title: 'Đi để thấy mình mới', subtitle: 'Chúng tôi tin mỗi hành trình tốt đều bắt đầu từ sự thấu hiểu.', image: IMG.hero, tabs: ['Câu chuyện', 'Cam kết', 'Đối tác', 'Liên hệ'], type: 'about' },
};

const slugify = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const linkToPage = label => ({
  'Miền Bắc':'tour-trong-nuoc','Miền Trung':'tour-trong-nuoc','Miền Nam':'tour-trong-nuoc','Miền Tây':'tour-trong-nuoc',
  'Nhật Bản':'tour-nuoc-ngoai','Hàn Quốc':'tour-nuoc-ngoai','Trung Quốc':'tour-nuoc-ngoai','Thái Lan':'tour-nuoc-ngoai','Châu Âu':'tour-nuoc-ngoai','Úc · Mỹ · Phi':'tour-nuoc-ngoai',
  'Tour khách đoàn':'tour-khach-doan','Tour MICE':'tour-khach-doan','Teambuilding':'tour-khach-doan','Tour gia đình':'tour-khach-doan','Tour thiết kế riêng':'tour-khach-doan',
  'Tour trong ngày':'tour-trong-ngay','Tour hành hương':'tour-hanh-huong','Tour trekking':'tour-trekking','Vé máy bay':'ve-may-bay','Khách sạn':'khach-san','Vé vui chơi':'ve-vui-choi','Dịch vụ visa':'dich-vu-visa','eSIM quốc tế':'esim-quoc-te','Combo tiết kiệm':'combo-tiet-kiem'
}[label] || slugify(label));
const serviceToPage = { 'Tour trọn gói':'tour-trong-nuoc', 'Vé máy bay':'ve-may-bay', 'Khách sạn':'khach-san', 'Vé vui chơi':'ve-vui-choi', 'Visa du lịch':'dich-vu-visa', 'eSIM quốc tế':'esim-quoc-te', 'Combo du lịch':'combo-tiet-kiem', 'Tour trekking':'tour-trekking' };

const formatPrice = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
const getTourDates = tour => tour.departureDates || [0,7,14].map(offset=>{const [day,month]=tour.date.split('/').map(Number);const date=new Date(2026,month-1,day+offset);return `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}`});
const getTransport = tour => tour.transport || ([7,10].includes(tour.id) ? 'Xe du lịch' : 'Máy bay');

function App() {
  const [page, setPage] = useState(() => new URLSearchParams(window.location.search).get('page') || 'home');
  const [menu, setMenu] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const closeMenuTimer = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideCycle, setSlideCycle] = useState(0);
  const [service, setService] = useState('Tour trọn gói');
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('Tất cả');
  const [month, setMonth] = useState('Bất kỳ');
  const [visibleTours, setVisibleTours] = useState(featuredTours);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(current => (current + 1) % heroSlides.length), 2500);
    return () => clearInterval(timer);
  }, [slideCycle]);

  useEffect(() => {
    const closeMenu = event => {
      if (event.type === 'keydown' && event.key === 'Escape') setCatalogOpen(false);
      if (event.type === 'pointerdown' && !event.target.closest('.nav')) setCatalogOpen(false);
    };
    document.addEventListener('pointerdown', closeMenu);
    document.addEventListener('keydown', closeMenu);
    return () => {
      document.removeEventListener('pointerdown', closeMenu);
      document.removeEventListener('keydown', closeMenu);
    };
  }, []);

  useEffect(() => {
    const syncPage = () => setPage(new URLSearchParams(window.location.search).get('page') || 'home');
    window.addEventListener('popstate', syncPage);
    return () => window.removeEventListener('popstate', syncPage);
  }, []);

  useEffect(() => {
    document.title = page === 'home'
      ? 'GoTravel — Đi để thấy mình mới'
      : `${pageCatalog[page]?.title || 'Khám phá'} | GoTravel`;
  }, [page]);

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  const notify = (message) => setToast(message);
  const toggleFavorite = id => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const addToCart = tour => {
    setCart(prev => {
      const existing = prev.find(item => item.id === tour.id);
      return existing ? prev.map(item => item.id === tour.id ? { ...item, qty: item.qty + 1 } : item) : [...prev, { ...tour, qty: 1 }];
    });
    notify('Đã thêm chuyến đi vào giỏ');
  };
  const changeQty = (id, amount) => setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + amount } : item).filter(item => item.qty > 0));
  const handleSearch = () => {
    const normalized = query.toLowerCase().trim();
    const result = tours.filter(t => (!normalized || `${t.title} ${t.place}`.toLowerCase().includes(normalized)) && (region === 'Tất cả' || t.country === region));
    setVisibleTours(result);
    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
    notify(result.length ? `Tìm thấy ${result.length} hành trình phù hợp` : 'Chưa có tour phù hợp, hãy thử từ khóa khác');
  };
  const applyTourFilter = filter => {
    setActiveFilter(filter);
    const result = filter === 'Tất cả' ? tours : filter === 'Trong nước' ? tours.filter(t => t.country === 'Việt Nam') : filter === 'Nghỉ dưỡng' ? tours.filter(t => [2,3].includes(t.id)) : filter === 'Châu Âu' ? tours.filter(t => t.place === 'Châu Âu') : tours.filter(t => ['Nhật Bản','Thái Lan'].includes(t.place));
    setVisibleTours(result);
  };
  const moveSlide = direction => {
    setActiveSlide(current => (current + direction + heroSlides.length) % heroSlides.length);
    setSlideCycle(cycle => cycle + 1);
  };
  const selectSlide = index => {
    setActiveSlide(index);
    setSlideCycle(cycle => cycle + 1);
  };
  const toggleCatalog = () => window.innerWidth <= 980 ? setCatalogOpen(open => !open) : setCatalogOpen(true);
  const openCatalog = () => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    if (window.innerWidth > 980) setCatalogOpen(true);
  };
  const scheduleCatalogClose = () => {
    if (window.innerWidth <= 980) return;
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    closeMenuTimer.current = setTimeout(() => setCatalogOpen(false), 360);
  };
  const goToPage = slug => {
    const next = pageCatalog[slug] ? slug : 'home';
    window.history.pushState({}, '', next === 'home' ? window.location.pathname : `${window.location.pathname}?page=${next}`);
    setPage(next);
    setCatalogOpen(false);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <div className="app">
    <div className="promo-bar"><span><Sparkles size={15}/> Ưu đãi thành viên mới: giảm đến 500.000đ</span><span className="promo-right">Hotline 24/7: <a href="tel:+84934105788" aria-label="Gọi hotline GoTravel 0934 105 788">0934 105 788</a></span></div>
    <header className="header">
      <div className="container nav-wrap">
        <a className="logo brand-logo" href="/" onClick={e=>{e.preventDefault();goToPage('home')}}><img src="/gotravel-logo.png" alt="GoTravel - Trải nghiệm sự khác biệt" /></a>
        <nav className={menu ? 'nav open' : 'nav'} onMouseEnter={()=>closeMenuTimer.current&&clearTimeout(closeMenuTimer.current)} onMouseLeave={scheduleCatalogClose}>
          <button className={`nav-catalog ${catalogOpen ? 'active' : ''}`} aria-expanded={catalogOpen} onMouseEnter={openCatalog} onClick={toggleCatalog}>Tour & dịch vụ <ChevronDown size={14}/></button>
          <a href="?page=diem-den" onMouseEnter={()=>setCatalogOpen(false)} onClick={e=>{e.preventDefault();goToPage('diem-den')}}>Điểm đến</a><a href="?page=trai-nghiem" onMouseEnter={()=>setCatalogOpen(false)} onClick={e=>{e.preventDefault();goToPage('trai-nghiem')}}>Trải nghiệm</a><a href="?page=cam-nang" onMouseEnter={()=>setCatalogOpen(false)} onClick={e=>{e.preventDefault();goToPage('cam-nang')}}>Cẩm nang</a><a href="?page=ve-gotravel" onMouseEnter={()=>setCatalogOpen(false)} onClick={e=>{e.preventDefault();goToPage('ve-gotravel')}}>Về GoTravel</a>
          {catalogOpen && <div className="mega-menu" onMouseEnter={openCatalog} onMouseLeave={scheduleCatalogClose}>
            <div className="mega-top"><span><Sparkles/> Khám phá mọi dịch vụ của GoTravel</span><a href="?page=tour-trong-nuoc" onClick={e=>{e.preventDefault();goToPage('tour-trong-nuoc')}}>Xem tất cả <ArrowRight/></a></div>
            <div className="mega-grid">{megaGroups.map(group => <div className="mega-group" key={group.title}><button className="mega-title" onClick={()=>goToPage(linkToPage(group.title))}><span>{React.createElement(group.icon)}</span><b>{group.title}</b><ChevronRight className="mega-title-arrow"/></button>{group.links.map(link => <a href={`?page=${linkToPage(link)}`} key={link} onClick={e=>{e.preventDefault();goToPage(linkToPage(link))}}>{link}<ChevronRight/></a>)}</div>)}</div>
            <div className="mega-promo"><span>GO DEAL</span><b>Tour giờ chót giảm đến 20%</b><a href="?page=combo-tiet-kiem" onClick={e=>{e.preventDefault();goToPage('combo-tiet-kiem')}}>Săn ưu đãi ngay <ArrowRight/></a></div>
          </div>}
        </nav>
        <div className="nav-actions">
          <button className="location-btn"><MapPin size={17}/> TP. Hồ Chí Minh <ChevronDown size={14}/></button>
          <button className="icon-btn" onClick={() => setLoginOpen(true)} aria-label="Tài khoản"><CircleUserRound size={22}/></button>
          <button className="icon-btn cart-btn" onClick={() => setCartOpen(true)} aria-label="Giỏ hàng"><ShoppingBag size={21}/>{cart.length > 0 && <i>{cart.reduce((a,b)=>a+b.qty,0)}</i>}</button>
          <button className="icon-btn menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X/> : <Menu/>}</button>
        </div>
      </div>
    </header>

    <main id="top">
      {page === 'home' ? <>
      <section className="hero">
        <div className="hero-slides">{heroSlides.map((slide,index)=><div key={slide.image} className={`hero-slide ${index===activeSlide?'active':''}`} style={{backgroundImage:`url(${slide.image})`}}></div>)}</div>
        <div className="hero-shade"></div>
        <div className="container hero-content">
          <div className="hero-copy-stage">
            {heroSlides.map((slide,index)=><div className={`hero-copy ${index===activeSlide?'active':''}`} aria-hidden={index!==activeSlide} key={slide.title || slide.image}>
              <span className="eyebrow light"><span></span> {slide.kicker}</span>
              <h1>{slide.line1}<br/><em>{slide.accent}</em></h1>
              <p>{slide.text}</p>
            </div>)}
          </div>
          <div className="search-card">
            <div className="service-tabs">
              {['Tour trọn gói','Vé máy bay','Khách sạn','Trải nghiệm'].map((item, i) => <button key={item} className={service === item ? 'active' : ''} onClick={() => setService(item)}>{i===0?<Compass/>:i===1?<Plane/>:i===2?<BedDouble/>:<Ticket/>}<span>{item}</span></button>)}
            </div>
            <HeroSearch service={service} query={query} setQuery={setQuery} region={region} setRegion={setRegion} month={month} setMonth={setMonth} onSearch={handleSearch} notify={notify}/>
          </div>
          <div className="hero-trust"><span><ShieldCheck/> Giá minh bạch</span><span><Phone/> Tư vấn 24/7</span><span><BadgePercent/> Ưu đãi mỗi ngày</span></div>
          <div className="hero-controls"><button onClick={()=>moveSlide(-1)} aria-label="Banner trước"><ArrowLeft/></button><div>{heroSlides.map((_,index)=><button key={index} className={index===activeSlide?'active':''} onClick={()=>selectSlide(index)} aria-label={`Banner ${index+1}`}><i></i></button>)}</div><button onClick={()=>moveSlide(1)} aria-label="Banner sau"><ArrowRight/></button></div>
        </div>
      </section>

      <section className="quick-links container">
        {[['Giờ chót',Clock3,'Chốt tour, đi ngay','tour-trong-nuoc'],['Combo tiết kiệm',PackageCheck,'Bay + nghỉ dưỡng','combo-tiet-kiem'],['Tour riêng',Users,'Thiết kế theo ý bạn','tour-khach-doan'],['Visa du lịch',Ticket,'Trọn gói, nhanh gọn','dich-vu-visa']].map(([title,Icon,sub,target])=><button key={title} onClick={()=>goToPage(target)}><span className="quick-icon"><Icon/></span><span><b>{title}</b><small>{sub}</small></span><ChevronRight/></button>)}
      </section>

      <section className="section container" id="tours">
        <SectionHead eyebrow="Hành trình nổi bật" title="Đang được yêu thích" text="Những chuyến đi được cộng đồng GoTravel lựa chọn nhiều nhất tuần này." />
        <div className="filter-row">{['Tất cả','Trong nước','Châu Á','Châu Âu','Nghỉ dưỡng'].map(x=><button key={x} onClick={()=>applyTourFilter(x)} className={activeFilter===x?'active':''}>{x}</button>)}</div>
        {visibleTours.length ? <div className="tour-grid">{visibleTours.map(tour => <TourCard key={tour.id} tour={tour} favorite={favorites.includes(tour.id)} onFavorite={()=>toggleFavorite(tour.id)} onDetail={selected=>setDetail(selected)} onAdd={selected=>addToCart(selected)} />)}</div> : <div className="empty"><Compass size={40}/><h3>Chưa tìm thấy hành trình</h3><p>Thử tìm “Đà Nẵng”, “Nhật Bản” hoặc chọn lại phạm vi.</p><button onClick={()=>{setVisibleTours(featuredTours);setQuery('');setRegion('Tất cả')}}>Xem tất cả tour</button></div>}
      </section>

      <section className="catalog-section container" id="catalog">
        <SectionHead eyebrow="Tất cả trong một" title="Hệ sinh thái du lịch" text="Đầy đủ các nhóm dịch vụ phổ biến, được sắp xếp lại để tìm nhanh và đặt dễ hơn." />
        <div className="service-grid">{travelServices.map(item => <button className={`service-card ${item.tone}`} key={item.title} onClick={()=>goToPage(serviceToPage[item.title])}><span className="service-icon">{React.createElement(item.icon)}</span><span className="service-main"><b>{item.title}</b><small>{item.desc}</small></span><span className="service-arrow"><ArrowRight/></span><span className="service-links">{item.links.map(link=><i key={link}>{link}</i>)}</span></button>)}</div>
        <div className="catalog-strip"><div><Waves/><span><b>Du lịch biển đảo</b><small>Phú Quốc · Nha Trang · Quy Nhơn</small></span></div><div><Building2/><span><b>City break</b><small>Singapore · Bangkok · Seoul</small></span></div><div><Users/><span><b>Khách đoàn & MICE</b><small>Thiết kế riêng cho doanh nghiệp</small></span></div><button onClick={()=>setConsultOpen(true)}>Nhận tư vấn miễn phí <ArrowRight/></button></div>
      </section>

      <section className="dest-section" id="destinations">
        <div className="container">
          <SectionHead eyebrow="Bản đồ cảm hứng" title="Bạn muốn đi đâu tiếp?" text="Từ biển xanh Việt Nam đến những thành phố rực rỡ trên thế giới." inverse />
          <div className="destination-grid">
            <Destination image={IMG.hoian} name="Việt Nam" meta="246 hành trình" tall onClick={()=>goToPage('diem-den-viet-nam')} />
            <Destination image={IMG.japan} name="Nhật Bản" meta="32 hành trình" onClick={()=>goToPage('diem-den-nhat-ban')} />
            <Destination image={IMG.thailand} name="Thái Lan" meta="41 hành trình" onClick={()=>goToPage('diem-den-thai-lan')} />
            <Destination image={IMG.paris} name="Châu Âu" meta="56 hành trình" wide onClick={()=>goToPage('diem-den-chau-au')} />
          </div>
        </div>
      </section>

      <section className="section container" id="experiences">
        <div className="experience-banner">
          <div className="experience-image" style={{backgroundImage:`url(${IMG.bali})`}}><button aria-label="Xem video"><Play fill="currentColor"/></button><span>01:24</span></div>
          <div className="experience-copy"><span className="eyebrow"><span></span> Travel different</span><h2>Không chỉ là một chuyến đi.</h2><p>GoTravel chọn những trải nghiệm bản địa giàu cảm xúc, lịch trình vừa vặn và đối tác được kiểm chứng — để bạn thật sự sống trong từng điểm đến.</p><div className="metrics"><div><b>12+</b><span>Năm kinh nghiệm</span></div><div><b>48K</b><span>Khách hàng vui vẻ</span></div><div><b>4.9</b><span>Điểm đánh giá</span></div></div><button className="text-link">Câu chuyện của chúng tôi <ArrowRight/></button></div>
        </div>
      </section>

      <section className="section stories" id="stories">
        <div className="container"><SectionHead eyebrow="Góc cảm hứng" title="Đi đâu, ăn gì, chơi thế nào?" text="Cẩm nang nhỏ cho những chuyến đi lớn." />
          <div className="story-grid">
            <article className="story-feature"><img src={IMG.travel}/><div><span>Cẩm nang Việt Nam · 8 phút đọc</span><h3>Đi dọc Việt Nam: 7 điểm đến nên ghé ít nhất một lần</h3><button>Đọc bài viết <ArrowRight/></button></div></article>
            <article className="story-small"><img src={IMG.resort}/><div><span>Nghỉ dưỡng</span><h3>5 resort biển dành cho cuối tuần thật chậm</h3><a>6 phút đọc <ChevronRight/></a></div></article>
            <article className="story-small"><img src={IMG.camp}/><div><span>Kinh nghiệm</span><h3>Checklist du lịch thông minh cho người hay quên</h3><a>4 phút đọc <ChevronRight/></a></div></article>
          </div>
        </div>
      </section>

      <section className="newsletter"><div className="container newsletter-inner"><div><span className="eyebrow light"><span></span> Go further</span><h2>Nhận cảm hứng cho chuyến đi tiếp theo.</h2><p>Ưu đãi mới, hành trình hay — gửi vào hộp thư của bạn, không gửi spam.</p></div><form onSubmit={e=>{e.preventDefault();notify('Đăng ký thành công — hẹn gặp bạn ở chuyến đi mới!');e.currentTarget.reset()}}><input type="email" required placeholder="Email của bạn"/><button>Đăng ký <ArrowRight/></button><small>Bằng việc đăng ký, bạn đồng ý với chính sách bảo mật.</small></form></div></section>
      </> : <SubPage data={pageCatalog[page] || pageCatalog['tour-trong-nuoc']} tours={tours} favorites={favorites} onFavorite={toggleFavorite} onDetail={setDetail} onAdd={addToCart} notify={notify} onConsult={()=>setConsultOpen(true)} goHome={()=>goToPage('home')} />}
    </main>

    <footer id="about"><div className="container footer-grid"><div className="footer-brand"><a className="logo brand-logo footer-logo" href="#top"><img src="/gotravel-logo.png" alt="GoTravel" /></a><p>Biến mỗi chuyến đi thành một phiên bản mới của chính bạn.</p><div className="socials"><a aria-label="Facebook">f</a><a aria-label="Instagram">◎</a><a aria-label="Youtube">▶</a></div></div><FooterCol title="Khám phá" links={['Tour trong nước','Tour quốc tế','Tour giờ chót','Combo du lịch','Trải nghiệm']} /><FooterCol title="Hỗ trợ" links={['Trung tâm trợ giúp','Chính sách đặt tour','Chính sách hoàn hủy','Bảo hiểm du lịch','Liên hệ']} /><div className="footer-contact"><h4>Liên hệ</h4><a href="tel:+84934105788"><Phone/> <span><small>Hotline 24/7</small>0934 105 788</span></a><a href="https://maps.google.com/?q=82+Nguyễn+Huệ,+Quận+1,+TP.HCM" target="_blank" rel="noreferrer"><MapPin/> 82 Nguyễn Huệ, Quận 1, TP.HCM</a><a href="mailto:info@gotravel.vn"><span className="contact-mail">@</span> info@gotravel.vn</a></div></div><div className="container footer-bottom"><span>© 2026 GoTravel. Thiết kế với cảm hứng xê dịch.</span><span>Điều khoản · Quyền riêng tư · Cookies</span></div></footer>

    {cartOpen && <CartDrawer cart={cart} total={total} onClose={()=>setCartOpen(false)} onQty={changeQty} onCheckout={()=>setCheckout(true)} />}
    {detail && <TourModal tour={detail} onClose={()=>setDetail(null)} onAdd={selected=>{addToCart(selected);setDetail(null);setCartOpen(true)}} />}
    {loginOpen && <LoginModal onClose={()=>setLoginOpen(false)} notify={notify} />}
    {checkout && <CheckoutModal total={total} onClose={()=>setCheckout(false)} onDone={()=>{setCheckout(false);setCartOpen(false);setCart([]);notify('Yêu cầu đặt tour đã được ghi nhận!')}} />}
    {consultOpen && <ConsultModal onClose={()=>setConsultOpen(false)} onDone={()=>{setConsultOpen(false);notify('Đã nhận yêu cầu — GoTravel sẽ liên hệ bạn trong 15 phút')}} />}
    {toast && <div className="toast"><Check size={18}/>{toast}</div>}
  </div>
}

function HeroSearch({service,query,setQuery,region,setRegion,month,setMonth,onSearch,notify}) {
  const [origin,setOrigin] = useState('TP. Hồ Chí Minh');
  const [guests,setGuests] = useState('2 khách');
  const submit = () => service==='Tour trọn gói' ? onSearch() : notify(`Đang tìm ${service.toLowerCase()} phù hợp`);
  if (service==='Vé máy bay') return <div className="search-grid contextual-search">
    <label className="search-field"><span>Điểm đi</span><div><Plane/><input value={origin} onChange={e=>setOrigin(e.target.value)} /></div></label>
    <label className="search-field"><span>Điểm đến</span><div><MapPin/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Bạn muốn bay đến đâu?"/></div></label>
    <label className="search-field"><span>Ngày khởi hành</span><div><CalendarDays/><input type="date" aria-label="Ngày khởi hành"/></div></label>
    <button className="search-submit" onClick={submit}>Tìm chuyến bay <ArrowRight/></button>
  </div>;
  if (service==='Khách sạn') return <div className="search-grid contextual-search">
    <label className="search-field destination"><span>Nơi lưu trú</span><div><Building2/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Thành phố, khách sạn..."/></div></label>
    <label className="search-field"><span>Nhận phòng</span><div><CalendarDays/><input type="date" aria-label="Ngày nhận phòng"/></div></label>
    <label className="search-field"><span>Khách & phòng</span><div><Users/><select value={guests} onChange={e=>setGuests(e.target.value)}><option>2 khách</option><option>Gia đình 4 khách</option><option>Nhóm 6 khách</option></select></div></label>
    <button className="search-submit" onClick={submit}>Tìm khách sạn <ArrowRight/></button>
  </div>;
  if (service==='Trải nghiệm') return <div className="search-grid contextual-search">
    <label className="search-field destination"><span>Điểm đến</span><div><Compass/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Bạn muốn trải nghiệm gì?"/></div></label>
    <label className="search-field"><span>Ngày sử dụng</span><div><CalendarDays/><input type="date" aria-label="Ngày sử dụng"/></div></label>
    <label className="search-field"><span>Số khách</span><div><Users/><select value={guests} onChange={e=>setGuests(e.target.value)}><option>2 khách</option><option>4 khách</option><option>6+ khách</option></select></div></label>
    <button className="search-submit" onClick={submit}>Tìm trải nghiệm <ArrowRight/></button>
  </div>;
  return <div className="search-grid">
    <label className="search-field destination"><span>Bạn muốn đi đâu?</span><div><Search/><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&onSearch()} placeholder="Nhập tên điểm đến..."/></div></label>
    <label className="search-field"><span>Phạm vi</span><div><MapPin/><select value={region} onChange={e=>setRegion(e.target.value)}><option>Tất cả</option><option>Việt Nam</option><option>Quốc tế</option></select></div></label>
    <label className="search-field"><span>Thời gian</span><div><CalendarDays/><select value={month} onChange={e=>setMonth(e.target.value)}><option>Bất kỳ</option><option>Tháng 10</option><option>Tháng 11</option><option>Tháng 12</option></select></div></label>
    <button className="search-submit" onClick={onSearch}>Tìm chuyến đi <ArrowRight/></button>
  </div>;
}

function SubPage({data,tours,favorites,onFavorite,onDetail,onAdd,notify,onConsult,goHome}) {
  const [activeTab,setActiveTab] = useState(data.tabs[0]);
  const [keyword,setKeyword] = useState('');
  const [sort,setSort] = useState('Phổ biến nhất');
  const [departure,setDeparture] = useState('Tất cả');
  const [transport,setTransport] = useState('Tất cả');
  const [duration,setDuration] = useState('Mọi thời lượng');
  const [maxPrice,setMaxPrice] = useState(100);
  const [dealsOnly,setDealsOnly] = useState(false);
  useEffect(()=>{setActiveTab(data.tabs[0]);setKeyword('');setDeparture('Tất cả');setTransport('Tất cả');setDuration('Mọi thời lượng');setMaxPrice(100);setDealsOnly(false)},[data]);
  const isTour = ['tour','group','destination'].includes(data.type);
  const pageTours = useMemo(() => {
    let result = data.title.includes('trong nước') ? tours.filter(t=>t.country==='Việt Nam') : data.title.includes('nước ngoài') ? tours.filter(t=>t.country==='Quốc tế') : tours;
    if (data.destinationFilter) result = result.filter(t=>t.destination===data.destinationFilter);
    if (data.destinationFilter && activeTab!=='Tất cả') result = result.filter(t=>t.area===activeTab);
    if (keyword) result = result.filter(t=>`${t.title} ${t.place}`.toLowerCase().includes(keyword.toLowerCase()));
    if (departure!=='Tất cả') result = result.filter(t=>t.departure===departure);
    if (transport!=='Tất cả') result = result.filter(t=>getTransport(t)===transport);
    if (duration!=='Mọi thời lượng') result = result.filter(t=>{const days=parseInt(t.days); return duration==='1 - 3 ngày'?days<=3:duration==='4 - 6 ngày'?days>=4&&days<=6:days>6});
    result = result.filter(t=>t.price<=maxPrice*1000000);
    if (dealsOnly) result = result.filter(t=>t.old>t.price);
    if (sort==='Giá thấp nhất') result=[...result].sort((a,b)=>a.price-b.price);
    if (sort==='Đánh giá cao') result=[...result].sort((a,b)=>b.rating-a.rating);
    return result;
  },[data,activeTab,keyword,sort,tours,departure,transport,duration,maxPrice,dealsOnly]);
  const offers = [
    {title:`${data.title} tiêu chuẩn`,meta:'Linh hoạt · Xác nhận nhanh',price:'Từ 990.000đ',image:data.image},
    {title:`${data.title} được yêu thích`,meta:'4.9 ★ · 320 lượt đặt',price:'Từ 1.490.000đ',image:IMG.resort},
    {title:`${data.title} cao cấp`,meta:'Đặc quyền · Hỗ trợ 24/7',price:'Từ 2.290.000đ',image:IMG.japan},
    {title:`${data.title} cho gia đình`,meta:'Tiện lợi · Tiết kiệm',price:'Từ 1.890.000đ',image:IMG.beach},
    {title:`${data.title} linh hoạt`,meta:'Đổi lịch dễ dàng',price:'Từ 790.000đ',image:IMG.hoian},
    {title:`${data.title} trải nghiệm`,meta:'Gợi ý bởi GoTravel',price:'Từ 1.190.000đ',image:IMG.bali},
  ].filter(item=>!keyword||item.title.toLowerCase().includes(keyword.toLowerCase()));
  return <div className="sub-page">
    <section className="sub-hero" style={{backgroundImage:`url(${data.image})`}}><div className="sub-hero-shade"></div><div className="container sub-hero-content"><div className="breadcrumbs"><button onClick={goHome}>Trang chủ</button><ChevronRight/><span>{data.title}</span></div><span className="eyebrow light"><span></span>{data.eyebrow}</span><h1>{data.title}</h1><p>{data.subtitle}</p><div className="sub-search"><Search/><input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`Tìm trong ${data.title.toLowerCase()}...`}/><button onClick={()=>notify(keyword?`Đang tìm “${keyword}”`:'Hãy nhập từ khóa cần tìm')}>Tìm kiếm <ArrowRight/></button></div></div></section>
    <section className="sub-categories"><div className="container">{data.tabs.map(tab=><button key={tab} onClick={()=>setActiveTab(tab)} className={activeTab===tab?'active':''}>{tab}</button>)}</div></section>
    <section className="sub-content container"><div className="sub-toolbar"><div><span className="eyebrow"><span></span>Lựa chọn dành cho bạn</span><h2>{isTour?'Hành trình nổi bật':'Sản phẩm nổi bật'}</h2><p>{isTour?pageTours.length:offers.length} kết quả · {activeTab}</p></div><label>Sắp xếp<select value={sort} onChange={e=>setSort(e.target.value)}><option>Phổ biến nhất</option><option>Giá thấp nhất</option><option>Đánh giá cao</option></select></label></div>
      <div className="sub-layout"><aside className="sub-filter"><div className="filter-head"><h3>Bộ lọc</h3><button className="filter-reset" onClick={()=>{setDeparture('Tất cả');setTransport('Tất cả');setDuration('Mọi thời lượng');setMaxPrice(100);setDealsOnly(false)}}>Đặt lại</button></div><label>Điểm khởi hành<select value={departure} onChange={e=>setDeparture(e.target.value)}><option>Tất cả</option><option>TP. Hồ Chí Minh</option><option>Hà Nội</option><option>Đà Nẵng</option></select></label><label>Phương tiện<select value={transport} onChange={e=>setTransport(e.target.value)}><option>Tất cả</option><option>Máy bay</option><option>Xe du lịch</option></select></label><label>Khoảng giá đến {maxPrice} triệu<input type="range" min="3" max="100" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/></label><div className="price-range"><span>3 triệu</span><span>100 triệu</span></div><label>Thời lượng<select value={duration} onChange={e=>setDuration(e.target.value)}><option>Mọi thời lượng</option><option>1 - 3 ngày</option><option>4 - 6 ngày</option><option>Trên 7 ngày</option></select></label><label className="check-line"><input type="checkbox" checked={dealsOnly} onChange={e=>setDealsOnly(e.target.checked)}/> Chỉ hiển thị ưu đãi</label><button onClick={()=>notify(`Đang hiển thị ${pageTours.length} lựa chọn phù hợp`)}>Áp dụng bộ lọc</button></aside>
        <div className={isTour?'sub-tour-grid':'offer-grid'}>{isTour ? pageTours.map(tour=><TourCard key={tour.id} tour={tour} favorite={favorites.includes(tour.id)} onFavorite={()=>onFavorite(tour.id)} onDetail={selected=>onDetail(selected)} onAdd={selected=>onAdd(selected)}/>) : offers.map((offer,index)=><article className="offer-card" key={offer.title}><div><img src={offer.image} alt=""/><span>{index%2?'Đề xuất':'Ưu đãi'}</span></div><section><small>{offer.meta}</small><h3>{offer.title}</h3><div><b>{offer.price}</b><button onClick={()=>notify(`Đã chọn ${offer.title}`)}>Chọn <ArrowRight/></button></div></section></article>)}</div>
      </div>
    </section>
    <section className="sub-benefits"><div className="container"><SectionHead eyebrow="An tâm lựa chọn" title="GoTravel đồng hành từ đầu đến cuối" text="Thông tin rõ ràng, hỗ trợ thật và trải nghiệm được kiểm chứng."/><div className="benefit-grid">{[[ShieldCheck,'Giá minh bạch','Không phí ẩn, xác nhận trước khi thanh toán'],[Users,'Chuyên viên riêng','Tư vấn theo đúng nhu cầu của bạn'],[Clock3,'Hỗ trợ 24/7','Luôn có người đồng hành khi cần'],[BadgePercent,'Ưu đãi thành viên','Tích điểm cho mọi hành trình']].map(([Icon,title,text])=><div key={title}><span><Icon/></span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
    <section className="process-section container"><SectionHead eyebrow="Đặt dịch vụ thật dễ" title="Chỉ 3 bước để bắt đầu" text="Quy trình tinh gọn, phù hợp cả khi bạn chưa có kế hoạch rõ ràng."/><div className="process-grid">{[['01','Tìm & so sánh','Lọc nhanh theo điểm đến, thời gian và ngân sách.'],['02','Chọn phương án','Xem thông tin chi tiết và thêm vào hành trình.'],['03','Xác nhận','Chuyên viên GoTravel liên hệ và hoàn tất đặt chỗ.']].map(([n,t,d])=><div key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></div>)}</div></section>
    <section className="faq-section"><div className="container faq-grid"><div><span className="eyebrow"><span></span>Hỏi đáp</span><h2>Điều bạn có thể muốn biết</h2><p>Nếu chưa tìm thấy câu trả lời, đội ngũ tư vấn luôn sẵn sàng hỗ trợ.</p></div><div>{['Tôi có thể thay đổi ngày sau khi đặt không?','Giá hiển thị đã bao gồm những gì?','GoTravel hỗ trợ thanh toán bằng cách nào?','Tôi cần chuẩn bị thông tin gì?'].map((q,i)=><details key={q}><summary>{q}<Plus/></summary><p>{i===0?'Có. Chính sách đổi lịch tùy sản phẩm và sẽ được hiển thị rõ trước khi xác nhận.':'Chuyên viên sẽ gửi đầy đủ quyền lợi, điều kiện và chi phí cuối cùng trước khi bạn thanh toán.'}</p></details>)}</div></div></section>
    <section className="sub-cta"><div className="container"><div><span>Cần một hành trình riêng?</span><h2>Kể chúng tôi nghe chuyến đi bạn đang mơ.</h2></div><button onClick={onConsult}>Thiết kế tour riêng <ArrowRight/></button></div></section>
  </div>
}

function SectionHead({eyebrow,title,text,inverse}) { return <div className={`section-head ${inverse?'inverse':''}`}><div><span className="eyebrow"><span></span>{eyebrow}</span><h2>{title}</h2></div><p>{text}</p></div> }

function TourCard({tour,favorite,onFavorite,onDetail,onAdd}) {
  const dates=getTourDates(tour);
  const [selectedDate,setSelectedDate]=useState(tour.date);
  const selected={...tour,date:selectedDate};
  return <article className="tour-card"><div className="tour-img"><img src={tour.image} alt={tour.title}/><span className="tag">{tour.tag}</span><button className={`heart ${favorite?'active':''}`} onClick={onFavorite} aria-label="Yêu thích"><Heart fill={favorite?'currentColor':'none'}/></button><span className="seats">Chỉ còn {tour.seats} chỗ</span></div><div className="tour-body"><div className="rating"><Star fill="currentColor"/> {tour.rating} <span>({tour.reviews})</span></div><h3 onClick={()=>onDetail(selected)}>{tour.title}</h3><div className="tour-meta"><span><MapPin/> Từ {tour.departure}</span><span><Clock3/> {tour.days}</span><span><Plane/> {getTransport(tour)}</span></div><div className="tour-date-label"><CalendarDays/> Chọn ngày khởi hành</div><div className="tour-dates">{dates.map(date=><button key={date} className={selectedDate===date?'active':''} onClick={()=>setSelectedDate(date)}>{date}</button>)}</div><div className="tour-foot"><div><small>Giá từ</small><del>{formatPrice(tour.old)}</del><b>{formatPrice(tour.price)}</b></div><div className="card-actions"><button className="mini-cart" onClick={()=>onAdd(selected)} aria-label="Thêm vào giỏ"><Plus/></button><button className="detail-btn" onClick={()=>onDetail(selected)}>Xem nhanh <ArrowRight/></button></div></div></div></article>
}

function Destination({image,name,meta,tall,wide,onClick}) { return <button onClick={onClick} aria-label={`Khám phá ${name}`} className={`destination-card ${tall?'tall':''} ${wide?'wide':''}`} style={{backgroundImage:`url(${image})`}}><span className="dest-overlay"></span><span className="dest-text"><small>{meta}</small><b>{name}</b></span><span className="dest-arrow"><ArrowRight/></span></button> }

function FooterCol({title,links}) { return <div><h4>{title}</h4>{links.map(x=><a key={x}>{x}</a>)}</div> }

function Overlay({children,onClose,align='center'}) { return <div className={`overlay ${align}`} onMouseDown={e=>e.target===e.currentTarget&&onClose()}>{children}</div> }

function CartDrawer({cart,total,onClose,onQty,onCheckout}) { return <Overlay onClose={onClose} align="right"><aside className="cart-drawer"><div className="modal-head"><div><small>Hành trình của bạn</small><h2>Giỏ tour <span>({cart.length})</span></h2></div><button onClick={onClose}><X/></button></div><div className="cart-list">{cart.length===0?<div className="cart-empty"><ShoppingBag/><h3>Giỏ hàng đang trống</h3><p>Thêm một hành trình để bắt đầu chuyến đi nhé.</p></div>:cart.map(item=><div className="cart-item" key={item.id}><img src={item.image}/><div><h4>{item.title}</h4><span>{item.date} · {item.days}</span><b>{formatPrice(item.price)}</b><div className="qty"><button onClick={()=>onQty(item.id,-1)}><Minus/></button><span>{item.qty}</span><button onClick={()=>onQty(item.id,1)}><Plus/></button></div></div></div>)}</div>{cart.length>0&&<div className="cart-total"><div><span>Tạm tính</span><b>{formatPrice(total)}</b></div><small>Giá cuối cùng sẽ được xác nhận bởi tư vấn viên.</small><button onClick={onCheckout}>Tiếp tục đặt tour <ArrowRight/></button></div>}</aside></Overlay> }

function TourModal({tour,onClose,onAdd}) {
  const [tab,setTab]=useState('Tổng quan');
  const [selectedDate,setSelectedDate]=useState(tour.date);
  const dates=getTourDates(tour);
  const itinerary=['Đón khách và bắt đầu hành trình','Khám phá điểm đến biểu tượng','Trải nghiệm văn hóa và ẩm thực địa phương','Tự do mua sắm, nghỉ dưỡng','Kết thúc hành trình và trở về'];
  return <Overlay onClose={onClose}><div className="tour-modal tour-quickview"><button className="modal-x" onClick={onClose}><X/></button><div className="modal-image"><img src={tour.image} alt={tour.title}/><span>{tour.tag}</span><div className="modal-image-note"><b>{tour.rating} ★</b><small>{tour.reviews} khách đã đánh giá</small></div></div><div className="modal-content"><div className="rating"><Star fill="currentColor"/> Xem nhanh hành trình</div><h2>{tour.title}</h2><div className="modal-highlights"><span><Clock3/> {tour.days}</span><span><MapPin/> Từ {tour.departure}</span><span><Plane/> {getTransport(tour)}</span></div><div className="modal-tabs">{['Tổng quan','Lịch trình','Dịch vụ','Chính sách'].map(x=><button key={x} className={tab===x?'active':''} onClick={()=>setTab(x)}>{x}</button>)}</div><div className="modal-tab-content">{tab==='Tổng quan'&&<><p>Hành trình cân bằng giữa khám phá, trải nghiệm bản địa và thời gian nghỉ ngơi, được GoTravel tuyển chọn cho nhóm nhỏ và gia đình.</p><h4>Chọn ngày khởi hành</h4><div className="modal-dates">{dates.map(date=><button key={date} onClick={()=>setSelectedDate(date)} className={selectedDate===date?'active':''}>{date}<small>{tour.seats} chỗ</small></button>)}</div></>}{tab==='Lịch trình'&&<div className="itinerary-list">{itinerary.slice(0,Math.min(5,parseInt(tour.days))).map((item,index)=><div key={item}><b>Ngày {index+1}</b><span>{item}</span></div>)}</div>}{tab==='Dịch vụ'&&<div className="service-columns"><div><h4>Đã bao gồm</h4>{['Phương tiện theo chương trình','Khách sạn tiêu chuẩn 3–4 sao','Bữa ăn và vé tham quan','Hướng dẫn viên, bảo hiểm'].map(x=><span key={x}><Check/>{x}</span>)}</div><div><h4>Chưa bao gồm</h4>{['Chi phí cá nhân','Phụ thu phòng đơn','Dịch vụ ngoài chương trình'].map(x=><span key={x}><X/>{x}</span>)}</div></div>}{tab==='Chính sách'&&<div className="policy-box"><p><b>Đổi lịch:</b> Miễn phí một lần trước ngày đi 21 ngày.</p><p><b>Trẻ em:</b> Giá được xác nhận theo độ tuổi và dịch vụ sử dụng.</p><p><b>Hoàn hủy:</b> Áp dụng theo thời điểm hủy và điều kiện nhà cung cấp.</p></div>}</div><div className="modal-price"><div><small>Trọn gói ngày {selectedDate}</small><del>{formatPrice(tour.old)}</del><b>{formatPrice(tour.price)} <em>/ khách</em></b></div><button onClick={()=>onAdd({...tour,date:selectedDate})}>Chọn hành trình <ArrowRight/></button></div></div></div></Overlay>
}

function LoginModal({onClose,notify}) { return <Overlay onClose={onClose}><form className="small-modal" onSubmit={e=>{e.preventDefault();onClose();notify('Đăng nhập bản demo thành công')}}><button className="modal-x" type="button" onClick={onClose}><X/></button><span className="logo-mark"><CircleUserRound/></span><h2>Chào mừng trở lại</h2><p>Lưu hành trình yêu thích và nhận ưu đãi riêng.</p><label>Email<input required type="email" placeholder="ban@email.com"/></label><label>Mật khẩu<input required type="password" placeholder="••••••••"/></label><button className="primary" type="submit">Đăng nhập</button><button className="ghost" type="button" onClick={()=>notify('Tính năng tạo tài khoản đang ở chế độ demo')}>Tạo tài khoản mới</button></form></Overlay> }

function ConsultModal({onClose,onDone}) { return <Overlay onClose={onClose}><form className="small-modal consult-modal" onSubmit={e=>{e.preventDefault();onDone()}}><button className="modal-x" type="button" onClick={onClose}><X/></button><span className="eyebrow"><span></span>Thiết kế hành trình riêng</span><h2>Chuyến đi của bạn, theo cách của bạn.</h2><p>Cho GoTravel vài thông tin, chuyên viên sẽ đề xuất hành trình và ngân sách phù hợp.</p><div className="two-cols"><label>Điểm đến mong muốn<input required placeholder="Ví dụ: Nhật Bản, Phú Quốc..."/></label><label>Ngày dự kiến<input required type="date"/></label></div><div className="two-cols"><label>Số người<select defaultValue="2 người"><option>1 người</option><option>2 người</option><option>Gia đình 3–5 người</option><option>Nhóm trên 6 người</option></select></label><label>Ngân sách/người<select defaultValue="10–20 triệu"><option>Dưới 10 triệu</option><option>10–20 triệu</option><option>20–50 triệu</option><option>Trên 50 triệu</option></select></label></div><div className="two-cols"><label>Họ và tên<input required placeholder="Nguyễn Minh Anh"/></label><label>Số điện thoại<input required type="tel" placeholder="0934 105 788"/></label></div><label>Email<input type="email" placeholder="ban@email.com"/></label><label>Mong muốn đặc biệt<textarea placeholder="Khách sạn, trải nghiệm, trẻ em, chế độ ăn..."></textarea></label><label className="consult-consent"><input required type="checkbox"/> Tôi đồng ý để GoTravel liên hệ tư vấn về hành trình này.</label><button className="primary" type="submit">Gửi yêu cầu thiết kế tour <ArrowRight/></button></form></Overlay> }

function CheckoutModal({total,onClose,onDone}) { return <Overlay onClose={onClose}><form className="small-modal checkout-modal" onSubmit={e=>{e.preventDefault();onDone()}}><button className="modal-x" type="button" onClick={onClose}><X/></button><span className="eyebrow"><span></span> Xác nhận thông tin</span><h2>Gần đến chuyến đi rồi!</h2><p>GoTravel sẽ gọi lại trong 15 phút để xác nhận lịch và phương thức thanh toán.</p><div className="two-cols"><label>Họ và tên<input required placeholder="Nguyễn Minh Anh"/></label><label>Số điện thoại<input required type="tel" placeholder="09xx xxx xxx"/></label></div><label>Email<input required type="email" placeholder="ban@email.com"/></label><label>Ghi chú<textarea placeholder="Yêu cầu đặc biệt, số trẻ em..."></textarea></label><div className="pay-note"><CreditCard/><span><small>Tổng dự kiến</small><b>{formatPrice(total)}</b></span></div><button className="primary" type="submit">Gửi yêu cầu đặt tour</button></form></Overlay> }

createRoot(document.getElementById('root')).render(<App />);
