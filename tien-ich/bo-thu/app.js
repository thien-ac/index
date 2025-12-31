const grid = document.getElementById('grid');
const q = document.getElementById('q');
const printBtn = document.getElementById('printBtn');
const flipToggle = document.getElementById('flipToggle');
const simpToggle = document.getElementById('simpToggle');
const audioSelect = document.getElementById('audioMode');
const viewModeSel = document.getElementById('viewMode');

let data = [];
let useSimplified = false;
let flipMode = false;
let audioMode = 'pinyin';
let viewMode = 'flat';
if(viewModeSel){ viewModeSel.addEventListener('change', e=>{ viewMode = e.target.value; render(); }); }

function loadData(){
  // Try HTTP fetch first (GitHub Pages OK); fallback to inline JSON when file://
  fetch('radicals.json').then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
    .then(json=>{ data=json; render(); })
    .catch(err=>{
      const el = document.getElementById('radData');
      if(el && el.textContent.trim().length){ try{ data = JSON.parse(el.textContent); render(); } catch(e){ console.error('Inline JSON parse failed', e); }
      } else { console.warn('Fallback: please serve via http:// or use inline JSON build.'); }
    });
}

// Embed dataset inline so file:// cũng chạy
(function embed(){
  const el = document.getElementById('radData');
  if(el && !el.textContent.trim()){
    el.textContent = JSON.stringify([{"no": 1, "char": "一", "pinyin": "yī", "name_vi": "Nhất", "meaning_vi": "Số một", "examples": [], "variants": []}, {"no": 2, "char": "丨", "pinyin": "gǔn", "name_vi": "Cổn", "meaning_vi": "Nét sổ", "examples": [], "variants": []}, {"no": 3, "char": "丶", "pinyin": "zhǔ", "name_vi": "Chủ", "meaning_vi": "Chấm", "examples": [], "variants": []}, {"no": 4, "char": "丿", "pinyin": "piě", "name_vi": "Phiệt", "meaning_vi": "Nét phẩy", "examples": [], "variants": []}, {"no": 5, "char": "乙", "pinyin": "yǐ", "name_vi": "Ất", "meaning_vi": "Thiên can thứ hai", "examples": [], "variants": []}, {"no": 6, "char": "亅", "pinyin": "jué", "name_vi": "Quyết", "meaning_vi": "Nét sổ có móc", "examples": [], "variants": []}, {"no": 7, "char": "二", "pinyin": "èr", "name_vi": "Nhị", "meaning_vi": "Số hai", "examples": [], "variants": []}, {"no": 8, "char": "亠", "pinyin": "tóu", "name_vi": "Đầu", "meaning_vi": "Phần nắp/đỉnh", "examples": [], "variants": []}, {"no": 9, "char": "人", "pinyin": "rén", "name_vi": "Nhân", "meaning_vi": "Người", "examples": [], "variants": []}, {"no": 10, "char": "儿", "pinyin": "ér", "name_vi": "Nhi", "meaning_vi": "Con, trẻ", "examples": [], "variants": []}, {"no": 11, "char": "入", "pinyin": "rù", "name_vi": "Nhập", "meaning_vi": "Vào", "examples": [], "variants": []}, {"no": 12, "char": "八", "pinyin": "bā", "name_vi": "Bát", "meaning_vi": "Tám; chia cắt", "examples": [], "variants": []}, {"no": 13, "char": "冂", "pinyin": "jiōng", "name_vi": "Quynh", "meaning_vi": "Khung xa", "examples": [], "variants": []}, {"no": 14, "char": "冖", "pinyin": "mì", "name_vi": "Mịch", "meaning_vi": "Che, trùm", "examples": [], "variants": []}, {"no": 15, "char": "冫", "pinyin": "bīng", "name_vi": "Băng", "meaning_vi": "Băng", "examples": [], "variants": []}, {"no": 16, "char": "几", "pinyin": "jī", "name_vi": "Kỷ", "meaning_vi": "Ghế nhỏ", "examples": [], "variants": []}, {"no": 17, "char": "凵", "pinyin": "kǎn", "name_vi": "Khảm", "meaning_vi": "Há miệng", "examples": [], "variants": []}, {"no": 18, "char": "刀", "pinyin": "dāo", "name_vi": "Đao", "meaning_vi": "Dao", "examples": [], "variants": []}, {"no": 19, "char": "力", "pinyin": "lì", "name_vi": "Lực", "meaning_vi": "Sức mạnh", "examples": [], "variants": []}, {"no": 20, "char": "勹", "pinyin": "bāo", "name_vi": "Bao", "meaning_vi": "Bao bọc", "examples": [], "variants": []}, {"no": 21, "char": "匕", "pinyin": "bǐ", "name_vi": "Chủy", "meaning_vi": "Thìa", "examples": [], "variants": []}, {"no": 22, "char": "匚", "pinyin": "fāng", "name_vi": "Phương", "meaning_vi": "Hòm mở", "examples": [], "variants": []}, {"no": 23, "char": "匸", "pinyin": "xì", "name_vi": "Hệ", "meaning_vi": "Che đậy/giấu", "examples": [], "variants": []}, {"no": 24, "char": "十", "pinyin": "shí", "name_vi": "Thập", "meaning_vi": "Mười", "examples": [], "variants": []}, {"no": 25, "char": "卜", "pinyin": "bǔ", "name_vi": "Bốc", "meaning_vi": "Bói/chiêm", "examples": [], "variants": []}, {"no": 26, "char": "卩", "pinyin": "jié", "name_vi": "Tiết", "meaning_vi": "Con dấu", "examples": [], "variants": []}, {"no": 27, "char": "厂", "pinyin": "hàn", "name_vi": "Hán", "meaning_vi": "Vách đá", "examples": [], "variants": []}, {"no": 28, "char": "厶", "pinyin": "sī", "name_vi": "Tư", "meaning_vi": "Riêng tư", "examples": [], "variants": []}, {"no": 29, "char": "又", "pinyin": "yòu", "name_vi": "Hựu", "meaning_vi": "Lại nữa", "examples": [], "variants": []}, {"no": 30, "char": "口", "pinyin": "kǒu", "name_vi": "Khẩu", "meaning_vi": "Miệng", "examples": [], "variants": []}, {"no": 31, "char": "囗", "pinyin": "wéi", "name_vi": "Vi", "meaning_vi": "Vây quanh", "examples": [], "variants": []}, {"no": 32, "char": "土", "pinyin": "tǔ", "name_vi": "Thổ", "meaning_vi": "Đất", "examples": [], "variants": []}, {"no": 33, "char": "士", "pinyin": "shì", "name_vi": "Sĩ", "meaning_vi": "Kẻ sĩ", "examples": [], "variants": []}, {"no": 34, "char": "夂", "pinyin": "zhǐ", "name_vi": "Trĩ/Truy", "meaning_vi": "Đi phía sau", "examples": [], "variants": []}, {"no": 35, "char": "夊", "pinyin": "suī", "name_vi": "Tuy", "meaning_vi": "Đi chậm", "examples": [], "variants": []}, {"no": 36, "char": "夕", "pinyin": "xī", "name_vi": "Tịch", "meaning_vi": "Buổi tối", "examples": [], "variants": []}, {"no": 37, "char": "大", "pinyin": "dà", "name_vi": "Đại", "meaning_vi": "To lớn", "examples": [], "variants": []}, {"no": 38, "char": "女", "pinyin": "nǚ", "name_vi": "Nữ", "meaning_vi": "Phụ nữ", "examples": [], "variants": []}, {"no": 39, "char": "子", "pinyin": "zǐ", "name_vi": "Tử", "meaning_vi": "Con", "examples": [], "variants": []}, {"no": 40, "char": "宀", "pinyin": "mián", "name_vi": "Miên", "meaning_vi": "Mái nhà", "examples": [], "variants": []}, {"no": 41, "char": "寸", "pinyin": "cùn", "name_vi": "Thốn", "meaning_vi": "Tấc", "examples": [], "variants": []}, {"no": 42, "char": "小", "pinyin": "xiǎo", "name_vi": "Tiểu", "meaning_vi": "Nhỏ", "examples": [], "variants": []}, {"no": 43, "char": "尢", "pinyin": "wāng", "name_vi": "Uông", "meaning_vi": "Què yếu", "examples": [], "variants": []}, {"no": 44, "char": "尸", "pinyin": "shī", "name_vi": "Thi", "meaning_vi": "Xác chết", "examples": [], "variants": []}, {"no": 45, "char": "屮", "pinyin": "chè", "name_vi": "Triệt", "meaning_vi": "Mầm non", "examples": [], "variants": []}, {"no": 46, "char": "山", "pinyin": "shān", "name_vi": "Sơn", "meaning_vi": "Núi", "examples": [], "variants": []}, {"no": 47, "char": "巛", "pinyin": "chuān", "name_vi": "Xuyên", "meaning_vi": "Sông", "examples": [], "variants": []}, {"no": 48, "char": "工", "pinyin": "gōng", "name_vi": "Công", "meaning_vi": "Công việc", "examples": [], "variants": []}, {"no": 49, "char": "己", "pinyin": "jǐ", "name_vi": "Kỷ", "meaning_vi": "Bản thân", "examples": [], "variants": []}, {"no": 50, "char": "巾", "pinyin": "jīn", "name_vi": "Cân", "meaning_vi": "Khăn", "examples": [], "variants": []}, {"no": 51, "char": "干", "pinyin": "gān", "name_vi": "Can", "meaning_vi": "Khô/thiên can", "examples": [], "variants": []}, {"no": 52, "char": "幺", "pinyin": "yāo", "name_vi": "Yêu", "meaning_vi": "Sợi", "examples": [], "variants": []}, {"no": 53, "char": "广", "pinyin": "guǎng", "name_vi": "Nghiễm", "meaning_vi": "Mái hiên", "examples": [], "variants": []}, {"no": 54, "char": "廴", "pinyin": "yǐn", "name_vi": "Dẫn", "meaning_vi": "Bước dài", "examples": [], "variants": []}, {"no": 55, "char": "廾", "pinyin": "gǒng", "name_vi": "Củng", "meaning_vi": "Chắp tay", "examples": [], "variants": []}, {"no": 56, "char": "弋", "pinyin": "yì", "name_vi": "Dặc", "meaning_vi": "Bắn/giành", "examples": [], "variants": []}, {"no": 57, "char": "弓", "pinyin": "gōng", "name_vi": "Cung", "meaning_vi": "Cái cung", "examples": [], "variants": []}, {"no": 58, "char": "彐", "pinyin": "jì", "name_vi": "Kệ", "meaning_vi": "Đầu con nhím", "examples": [], "variants": []}, {"no": 59, "char": "彡", "pinyin": "shān", "name_vi": "Sam", "meaning_vi": "Lông tóc", "examples": [], "variants": []}, {"no": 60, "char": "彳", "pinyin": "chì", "name_vi": "Xích", "meaning_vi": "Bước chân trái", "examples": [], "variants": []}, {"no": 61, "char": "心", "pinyin": "xīn", "name_vi": "Tâm", "meaning_vi": "Trái tim; tâm", "examples": [], "variants": ["忄", "⺗"]}, {"no": 62, "char": "戈", "pinyin": "gē", "name_vi": "Qua", "meaning_vi": "Binh khí mác/qua", "examples": [], "variants": []}, {"no": 63, "char": "戶", "pinyin": "hù", "name_vi": "Hộ", "meaning_vi": "Cửa một cánh", "examples": [], "variants": []}, {"no": 64, "char": "手", "pinyin": "shǒu", "name_vi": "Thủ", "meaning_vi": "Tay", "examples": [], "variants": ["扌", "龵"]}, {"no": 65, "char": "支", "pinyin": "zhī", "name_vi": "Chi", "meaning_vi": "Cành nhánh", "examples": [], "variants": []}, {"no": 66, "char": "攴", "pinyin": "pū", "name_vi": "Phộc", "meaning_vi": "Đánh khẽ", "examples": [], "variants": []}, {"no": 67, "char": "文", "pinyin": "wén", "name_vi": "Văn", "meaning_vi": "Văn tự", "examples": [], "variants": []}, {"no": 68, "char": "斗", "pinyin": "dǒu", "name_vi": "Đấu", "meaning_vi": "Cái đấu/sao Bắc Đẩu", "examples": [], "variants": []}, {"no": 69, "char": "斤", "pinyin": "jīn", "name_vi": "Cân", "meaning_vi": "Rìu", "examples": [], "variants": []}, {"no": 70, "char": "方", "pinyin": "fāng", "name_vi": "Phương", "meaning_vi": "Vuông/phương", "examples": [], "variants": []}, {"no": 71, "char": "无", "pinyin": "wú", "name_vi": "Vô", "meaning_vi": "Không", "examples": [], "variants": []}, {"no": 72, "char": "日", "pinyin": "rì", "name_vi": "Nhật", "meaning_vi": "Mặt trời; ngày", "examples": [], "variants": []}, {"no": 73, "char": "曰", "pinyin": "yuē", "name_vi": "Viết", "meaning_vi": "Nói rằng", "examples": [], "variants": []}, {"no": 74, "char": "月", "pinyin": "yuè", "name_vi": "Nguyệt", "meaning_vi": "Mặt trăng; tháng", "examples": [], "variants": []}, {"no": 75, "char": "木", "pinyin": "mù", "name_vi": "Mộc", "meaning_vi": "Cây; gỗ", "examples": [], "variants": []}, {"no": 76, "char": "欠", "pinyin": "qiàn", "name_vi": "Khiếm", "meaning_vi": "Thiếu/ngáp", "examples": [], "variants": []}, {"no": 77, "char": "止", "pinyin": "zhǐ", "name_vi": "Chỉ", "meaning_vi": "Dừng lại", "examples": [], "variants": []}, {"no": 78, "char": "歹", "pinyin": "dǎi", "name_vi": "Đãi", "meaning_vi": "Xấu; tử", "examples": [], "variants": []}, {"no": 79, "char": "殳", "pinyin": "shū", "name_vi": "Thù", "meaning_vi": "Vũ khí gậy", "examples": [], "variants": []}, {"no": 80, "char": "毋", "pinyin": "wú", "name_vi": "Vô", "meaning_vi": "Chớ/đừng", "examples": [], "variants": []}, {"no": 81, "char": "比", "pinyin": "bǐ", "name_vi": "Tỷ", "meaning_vi": "So sánh", "examples": [], "variants": []}, {"no": 82, "char": "毛", "pinyin": "máo", "name_vi": "Mao", "meaning_vi": "Lông", "examples": [], "variants": []}, {"no": 83, "char": "氏", "pinyin": "shì", "name_vi": "Thị", "meaning_vi": "Thị tộc", "examples": [], "variants": []}, {"no": 84, "char": "气", "pinyin": "qì", "name_vi": "Khí", "meaning_vi": "Hơi/khí", "examples": [], "variants": []}, {"no": 85, "char": "水", "pinyin": "shuǐ", "name_vi": "Thủy", "meaning_vi": "Nước", "examples": [], "variants": ["氵", "氺"]}, {"no": 86, "char": "火", "pinyin": "huǒ", "name_vi": "Hỏa", "meaning_vi": "Lửa", "examples": [], "variants": []}, {"no": 87, "char": "爪", "pinyin": "zhǎo", "name_vi": "Trảo", "meaning_vi": "Móng vuốt", "examples": [], "variants": []}, {"no": 88, "char": "父", "pinyin": "fù", "name_vi": "Phụ", "meaning_vi": "Cha", "examples": [], "variants": []}, {"no": 89, "char": "爻", "pinyin": "yáo", "name_vi": "Hào", "meaning_vi": "Hào (Dịch)", "examples": [], "variants": []}, {"no": 90, "char": "爿", "pinyin": "qiáng", "name_vi": "Tường", "meaning_vi": "Mảnh gỗ", "examples": [], "variants": []}, {"no": 91, "char": "片", "pinyin": "piàn", "name_vi": "Phiến", "meaning_vi": "Mảnh tấm", "examples": [], "variants": []}, {"no": 92, "char": "牙", "pinyin": "yá", "name_vi": "Nha", "meaning_vi": "Răng", "examples": [], "variants": []}, {"no": 93, "char": "牛", "pinyin": "niú", "name_vi": "Ngưu", "meaning_vi": "Trâu/bò", "examples": [], "variants": []}, {"no": 94, "char": "犬", "pinyin": "quǎn", "name_vi": "Khuyển", "meaning_vi": "Chó", "examples": [], "variants": ["犭"]}, {"no": 95, "char": "玄", "pinyin": "xuán", "name_vi": "Huyền", "meaning_vi": "Huyền bí", "examples": [], "variants": []}, {"no": 96, "char": "玉", "pinyin": "yù", "name_vi": "Ngọc", "meaning_vi": "Ngọc", "examples": [], "variants": []}, {"no": 97, "char": "瓜", "pinyin": "guā", "name_vi": "Qua", "meaning_vi": "Dưa", "examples": [], "variants": []}, {"no": 98, "char": "瓦", "pinyin": "wǎ", "name_vi": "Ngõa", "meaning_vi": "Ngói", "examples": [], "variants": []}, {"no": 99, "char": "甘", "pinyin": "gān", "name_vi": "Cam", "meaning_vi": "Ngọt", "examples": [], "variants": []}, {"no": 100, "char": "生", "pinyin": "shēng", "name_vi": "Sinh", "meaning_vi": "Sự sống", "examples": [], "variants": []}, {"no": 101, "char": "用", "pinyin": "yòng", "name_vi": "Dụng", "meaning_vi": "Dùng", "examples": [], "variants": []}, {"no": 102, "char": "田", "pinyin": "tián", "name_vi": "Điền", "meaning_vi": "Ruộng", "examples": [], "variants": []}, {"no": 103, "char": "疋", "pinyin": "pǐ", "name_vi": "Thất", "meaning_vi": "Tấm vải", "examples": [], "variants": []}, {"no": 104, "char": "疒", "pinyin": "nè", "name_vi": "Nạch", "meaning_vi": "Bệnh tật", "examples": [], "variants": []}, {"no": 105, "char": "癶", "pinyin": "bō", "name_vi": "Bát", "meaning_vi": "Chân hướng lên", "examples": [], "variants": []}, {"no": 106, "char": "白", "pinyin": "bái", "name_vi": "Bạch", "meaning_vi": "Màu trắng", "examples": [], "variants": []}, {"no": 107, "char": "皮", "pinyin": "pí", "name_vi": "Bì", "meaning_vi": "Da", "examples": [], "variants": []}, {"no": 108, "char": "皿", "pinyin": "mǐn", "name_vi": "Mãnh", "meaning_vi": "Bát đĩa", "examples": [], "variants": []}, {"no": 109, "char": "目", "pinyin": "mù", "name_vi": "Mục", "meaning_vi": "Mắt", "examples": [], "variants": []}, {"no": 110, "char": "矛", "pinyin": "máo", "name_vi": "Mâu", "meaning_vi": "Cây mâu", "examples": [], "variants": []}, {"no": 111, "char": "矢", "pinyin": "shǐ", "name_vi": "Thỉ", "meaning_vi": "Mũi tên", "examples": [], "variants": []}, {"no": 112, "char": "石", "pinyin": "shí", "name_vi": "Thạch", "meaning_vi": "Đá", "examples": [], "variants": []}, {"no": 113, "char": "示", "pinyin": "shì", "name_vi": "Thị", "meaning_vi": "Chỉ thị; lễ", "examples": [], "variants": []}, {"no": 114, "char": "禸", "pinyin": "róu", "name_vi": "Nhựu", "meaning_vi": "Dấu chân thú", "examples": [], "variants": []}, {"no": 115, "char": "禾", "pinyin": "hé", "name_vi": "Hòa", "meaning_vi": "Lúa", "examples": [], "variants": []}, {"no": 116, "char": "穴", "pinyin": "xué", "name_vi": "Huyệt", "meaning_vi": "Hang/hốc", "examples": [], "variants": []}, {"no": 117, "char": "立", "pinyin": "lì", "name_vi": "Lập", "meaning_vi": "Đứng", "examples": [], "variants": []}, {"no": 118, "char": "竹", "pinyin": "zhú", "name_vi": "Trúc", "meaning_vi": "Tre", "examples": [], "variants": ["⺮"]}, {"no": 119, "char": "米", "pinyin": "mǐ", "name_vi": "Mễ", "meaning_vi": "Gạo", "examples": [], "variants": []}, {"no": 120, "char": "糸", "pinyin": "mì", "name_vi": "Mịch", "meaning_vi": "Tơ lụa", "examples": [], "variants": ["纟"]}, {"no": 121, "char": "缶", "pinyin": "fǒu", "name_vi": "Phữu", "meaning_vi": "Đồ đựng", "examples": [], "variants": []}, {"no": 122, "char": "网", "pinyin": "wǎng", "name_vi": "Võng", "meaning_vi": "Lưới", "examples": [], "variants": ["罒", "网"]}, {"no": 123, "char": "羊", "pinyin": "yáng", "name_vi": "Dương", "meaning_vi": "Cừu", "examples": [], "variants": []}, {"no": 124, "char": "羽", "pinyin": "yǔ", "name_vi": "Vũ", "meaning_vi": "Lông vũ", "examples": [], "variants": []}, {"no": 125, "char": "老", "pinyin": "lǎo", "name_vi": "Lão", "meaning_vi": "Già", "examples": [], "variants": []}, {"no": 126, "char": "而", "pinyin": "ér", "name_vi": "Nhi", "meaning_vi": "Và (而)", "examples": [], "variants": []}, {"no": 127, "char": "耒", "pinyin": "lěi", "name_vi": "Lỗi", "meaning_vi": "Cái cày", "examples": [], "variants": []}, {"no": 128, "char": "耳", "pinyin": "ěr", "name_vi": "Nhĩ", "meaning_vi": "Tai", "examples": [], "variants": []}, {"no": 129, "char": "聿", "pinyin": "yù", "name_vi": "Dự", "meaning_vi": "Bút lông", "examples": [], "variants": []}, {"no": 130, "char": "肉", "pinyin": "ròu", "name_vi": "Nhục", "meaning_vi": "Thịt", "examples": [], "variants": []}, {"no": 131, "char": "臣", "pinyin": "chén", "name_vi": "Thần", "meaning_vi": "Bề tôi", "examples": [], "variants": []}, {"no": 132, "char": "自", "pinyin": "zì", "name_vi": "Tự", "meaning_vi": "Bản thân; mũi", "examples": [], "variants": []}, {"no": 133, "char": "至", "pinyin": "zhì", "name_vi": "Chí", "meaning_vi": "Đến/tới", "examples": [], "variants": []}, {"no": 134, "char": "臼", "pinyin": "jiù", "name_vi": "Cữu", "meaning_vi": "Cối giã", "examples": [], "variants": []}, {"no": 135, "char": "舌", "pinyin": "shé", "name_vi": "Thiệt", "meaning_vi": "Lưỡi", "examples": [], "variants": []}, {"no": 136, "char": "舛", "pinyin": "chuǎn", "name_vi": "Soãn", "meaning_vi": "Trái nhau", "examples": [], "variants": []}, {"no": 137, "char": "舟", "pinyin": "zhōu", "name_vi": "Chu", "meaning_vi": "Thuyền", "examples": [], "variants": []}, {"no": 138, "char": "艮", "pinyin": "gěn", "name_vi": "Cấn", "meaning_vi": "Cứng; dừng", "examples": [], "variants": []}, {"no": 139, "char": "色", "pinyin": "sè", "name_vi": "Sắc", "meaning_vi": "Màu sắc", "examples": [], "variants": []}, {"no": 140, "char": "艸", "pinyin": "cǎo", "name_vi": "Thảo", "meaning_vi": "Cỏ", "examples": [], "variants": ["艹"]}, {"no": 141, "char": "虍", "pinyin": "hū", "name_vi": "Hù", "meaning_vi": "Vằn hổ", "examples": [], "variants": []}, {"no": 142, "char": "虫", "pinyin": "chóng", "name_vi": "Trùng", "meaning_vi": "Côn trùng", "examples": [], "variants": []}, {"no": 143, "char": "血", "pinyin": "xuè", "name_vi": "Huyết", "meaning_vi": "Máu", "examples": [], "variants": []}, {"no": 144, "char": "行", "pinyin": "xíng", "name_vi": "Hành", "meaning_vi": "Đi; hàng lối", "examples": [], "variants": []}, {"no": 145, "char": "衣", "pinyin": "yī", "name_vi": "Y", "meaning_vi": "Áo", "examples": [], "variants": []}, {"no": 146, "char": "襾", "pinyin": "yà", "name_vi": "Á", "meaning_vi": "Che/úp", "examples": [], "variants": []}, {"no": 147, "char": "見", "pinyin": "jiàn", "name_vi": "Kiến", "meaning_vi": "Thấy; nhìn", "examples": [], "variants": []}, {"no": 148, "char": "角", "pinyin": "jiǎo", "name_vi": "Giác", "meaning_vi": "Sừng; góc", "examples": [], "variants": []}, {"no": 149, "char": "言", "pinyin": "yán", "name_vi": "Ngôn", "meaning_vi": "Lời nói", "examples": [], "variants": ["讠"]}, {"no": 150, "char": "谷", "pinyin": "gǔ", "name_vi": "Cốc", "meaning_vi": "Thung lũng", "examples": [], "variants": []}, {"no": 151, "char": "豆", "pinyin": "dòu", "name_vi": "Đậu", "meaning_vi": "Đậu", "examples": [], "variants": []}, {"no": 152, "char": "豕", "pinyin": "shǐ", "name_vi": "Trư", "meaning_vi": "Heo", "examples": [], "variants": []}, {"no": 153, "char": "豸", "pinyin": "zhì", "name_vi": "Trãi", "meaning_vi": "Loài thú (豸)", "examples": [], "variants": []}, {"no": 154, "char": "貝", "pinyin": "bèi", "name_vi": "Bối", "meaning_vi": "Vỏ sò; tiền", "examples": [], "variants": []}, {"no": 155, "char": "赤", "pinyin": "chì", "name_vi": "Xích", "meaning_vi": "Màu đỏ", "examples": [], "variants": []}, {"no": 156, "char": "走", "pinyin": "zǒu", "name_vi": "Tẩu", "meaning_vi": "Đi/chạy", "examples": [], "variants": []}, {"no": 157, "char": "足", "pinyin": "zú", "name_vi": "Túc", "meaning_vi": "Chân", "examples": [], "variants": []}, {"no": 158, "char": "身", "pinyin": "shēn", "name_vi": "Thân", "meaning_vi": "Thân thể", "examples": [], "variants": []}, {"no": 159, "char": "車", "pinyin": "chē", "name_vi": "Xa", "meaning_vi": "Xe", "examples": [], "variants": ["车"]}, {"no": 160, "char": "辛", "pinyin": "xīn", "name_vi": "Tân", "meaning_vi": "Cay", "examples": [], "variants": []}, {"no": 161, "char": "辰", "pinyin": "chén", "name_vi": "Thần", "meaning_vi": "Thời thần", "examples": [], "variants": []}, {"no": 162, "char": "辵", "pinyin": "chuò", "name_vi": "Sước", "meaning_vi": "Bước đi", "examples": [], "variants": []}, {"no": 163, "char": "邑", "pinyin": "yì", "name_vi": "Ấp", "meaning_vi": "Thành ấp (phải)", "examples": [], "variants": ["⻏"]}, {"no": 164, "char": "酉", "pinyin": "yǒu", "name_vi": "Dậu", "meaning_vi": "Rượu", "examples": [], "variants": []}, {"no": 165, "char": "釆", "pinyin": "biàn", "name_vi": "Biện", "meaning_vi": "Phân biệt", "examples": [], "variants": []}, {"no": 166, "char": "里", "pinyin": "lǐ", "name_vi": "Lý", "meaning_vi": "Làng/dặm", "examples": [], "variants": []}, {"no": 167, "char": "金", "pinyin": "jīn", "name_vi": "Kim", "meaning_vi": "Kim loại", "examples": [], "variants": []}, {"no": 168, "char": "長", "pinyin": "cháng", "name_vi": "Trường", "meaning_vi": "Dài", "examples": [], "variants": []}, {"no": 169, "char": "門", "pinyin": "mén", "name_vi": "Môn", "meaning_vi": "Cửa (hai cánh)", "examples": [], "variants": ["门"]}, {"no": 170, "char": "阜", "pinyin": "fù", "name_vi": "Phụ", "meaning_vi": "Gò/đồi", "examples": [], "variants": ["阝"]}, {"no": 171, "char": "隶", "pinyin": "lì", "name_vi": "Lệ", "meaning_vi": "Nô lệ; phép", "examples": [], "variants": []}, {"no": 172, "char": "隹", "pinyin": "zhuī", "name_vi": "Chuy", "meaning_vi": "Chim đuôi ngắn", "examples": [], "variants": []}, {"no": 173, "char": "雨", "pinyin": "yǔ", "name_vi": "Vũ", "meaning_vi": "Mưa", "examples": [], "variants": []}, {"no": 174, "char": "青", "pinyin": "qīng", "name_vi": "Thanh", "meaning_vi": "Xanh; thanh", "examples": [], "variants": []}, {"no": 175, "char": "非", "pinyin": "fēi", "name_vi": "Phi", "meaning_vi": "Không; trái", "examples": [], "variants": []}, {"no": 176, "char": "面", "pinyin": "miàn", "name_vi": "Diện", "meaning_vi": "Mặt; diện", "examples": [], "variants": []}, {"no": 177, "char": "革", "pinyin": "gé", "name_vi": "Cách", "meaning_vi": "Da; cách", "examples": [], "variants": []}, {"no": 178, "char": "韋", "pinyin": "wéi", "name_vi": "Vi", "meaning_vi": "Da đã thuộc", "examples": [], "variants": []}, {"no": 179, "char": "韭", "pinyin": "jiǔ", "name_vi": "Cửu", "meaning_vi": "Hẹ/tỏi tây", "examples": [], "variants": []}, {"no": 180, "char": "音", "pinyin": "yīn", "name_vi": "Âm", "meaning_vi": "Âm thanh", "examples": [], "variants": []}, {"no": 181, "char": "頁", "pinyin": "yè", "name_vi": "Hiệt", "meaning_vi": "Trang; đầu", "examples": [], "variants": []}, {"no": 182, "char": "風", "pinyin": "fēng", "name_vi": "Phong", "meaning_vi": "Gió", "examples": [], "variants": []}, {"no": 183, "char": "飛", "pinyin": "fēi", "name_vi": "Phi", "meaning_vi": "Bay", "examples": [], "variants": []}, {"no": 184, "char": "食", "pinyin": "shí", "name_vi": "Thực", "meaning_vi": "Ăn; thực", "examples": [], "variants": ["饣"]}, {"no": 185, "char": "首", "pinyin": "shǒu", "name_vi": "Thủ", "meaning_vi": "Đầu", "examples": [], "variants": []}, {"no": 186, "char": "香", "pinyin": "xiāng", "name_vi": "Hương", "meaning_vi": "Hương thơm", "examples": [], "variants": []}, {"no": 187, "char": "馬", "pinyin": "mǎ", "name_vi": "Mã", "meaning_vi": "Ngựa", "examples": [], "variants": []}, {"no": 188, "char": "骨", "pinyin": "gǔ", "name_vi": "Cốt", "meaning_vi": "Xương", "examples": [], "variants": []}, {"no": 189, "char": "高", "pinyin": "gāo", "name_vi": "Cao", "meaning_vi": "Cao; tháp", "examples": [], "variants": []}, {"no": 190, "char": "髟", "pinyin": "biāo", "name_vi": "Tiêu", "meaning_vi": "Tóc dài", "examples": [], "variants": []}, {"no": 191, "char": "鬥", "pinyin": "dòu", "name_vi": "Đấu", "meaning_vi": "Đấu tranh", "examples": [], "variants": []}, {"no": 192, "char": "鬯", "pinyin": "chàng", "name_vi": "Sưởng", "meaning_vi": "Rượu thơm", "examples": [], "variants": []}, {"no": 193, "char": "鬲", "pinyin": "gé", "name_vi": "Cách", "meaning_vi": "Vạc kim loại", "examples": [], "variants": []}, {"no": 194, "char": "鬼", "pinyin": "guǐ", "name_vi": "Quỷ", "meaning_vi": "Ma quỷ", "examples": [], "variants": []}, {"no": 195, "char": "魚", "pinyin": "yú", "name_vi": "Ngư", "meaning_vi": "Cá", "examples": [], "variants": []}, {"no": 196, "char": "鳥", "pinyin": "niǎo", "name_vi": "Điểu", "meaning_vi": "Chim", "examples": [], "variants": []}, {"no": 197, "char": "鹵", "pinyin": "lǔ", "name_vi": "Lỗ", "meaning_vi": "Muối mỏ", "examples": [], "variants": []}, {"no": 198, "char": "鹿", "pinyin": "lù", "name_vi": "Lộc", "meaning_vi": "Hươu", "examples": [], "variants": []}, {"no": 199, "char": "麥", "pinyin": "mài", "name_vi": "Mạch", "meaning_vi": "Lúa mạch", "examples": [], "variants": []}, {"no": 200, "char": "麻", "pinyin": "má", "name_vi": "Ma", "meaning_vi": "Gai dầu", "examples": [], "variants": []}, {"no": 201, "char": "黃", "pinyin": "huáng", "name_vi": "Hoàng", "meaning_vi": "Màu vàng", "examples": [], "variants": []}, {"no": 202, "char": "黍", "pinyin": "shǔ", "name_vi": "Thử", "meaning_vi": "Kê (đậu mè)", "examples": [], "variants": []}, {"no": 203, "char": "黑", "pinyin": "hēi", "name_vi": "Hắc", "meaning_vi": "Màu đen", "examples": [], "variants": []}, {"no": 204, "char": "黹", "pinyin": "zhǐ", "name_vi": "Chỉ", "meaning_vi": "Thêu dệt", "examples": [], "variants": []}, {"no": 205, "char": "黽", "pinyin": "mǐn", "name_vi": "Mẫn/Điềm", "meaning_vi": "Ếnh ương", "examples": [], "variants": []}, {"no": 206, "char": "鼎", "pinyin": "dǐng", "name_vi": "Đỉnh", "meaning_vi": "Đỉnh/vạc", "examples": [], "variants": []}, {"no": 207, "char": "鼓", "pinyin": "gǔ", "name_vi": "Cổ", "meaning_vi": "Cái trống", "examples": [], "variants": []}, {"no": 208, "char": "鼠", "pinyin": "shǔ", "name_vi": "Thử", "meaning_vi": "Chuột", "examples": [], "variants": []}, {"no": 209, "char": "鼻", "pinyin": "bí", "name_vi": "Tị", "meaning_vi": "Mũi", "examples": [], "variants": []}, {"no": 210, "char": "齊", "pinyin": "qí", "name_vi": "Tề", "meaning_vi": "Tề (đều/chỉnh)", "examples": [], "variants": []}, {"no": 211, "char": "齒", "pinyin": "chǐ", "name_vi": "Xỉ", "meaning_vi": "Răng", "examples": [], "variants": []}, {"no": 212, "char": "龍", "pinyin": "lóng", "name_vi": "Long", "meaning_vi": "Rồng", "examples": [], "variants": []}, {"no": 213, "char": "龜", "pinyin": "guī", "name_vi": "Quy", "meaning_vi": "Rùa", "examples": [], "variants": []}, {"no": 214, "char": "龠", "pinyin": "yuè", "name_vi": "Dược", "meaning_vi": "Cái sáo", "examples": [], "variants": []}]);
  }
})();

loadData();

// === Grouping helpers ===
const strokeRanges = [
  [1,6,1],[7,29,2],[30,60,3],[61,94,4],[95,117,5],
  [118,146,6],[147,166,7],[167,175,8],[176,186,9],
  [187,194,10],[195,200,11],[201,204,12],[205,208,13],
  [209,210,14],[211,211,15],[212,213,16],[214,214,17]
];
function strokesByNo(no){ for(const [a,b,s] of strokeRanges){ if(no>=a && no<=b) return s; } return null; }
const families = [
  { key:'heart',  title:'Tâm/忄 (cảm xúc, ý nghĩ)',   members:[61] },
  { key:'hand',   title:'Thủ/扌 (tay, thao tác)',     members:[64] },
  { key:'water',  title:'Thủy/氵 (nước, chất lỏng)', members:[85] },
  { key:'fire',   title:'Hỏa/火 (lửa, nhiệt)',        members:[86] },
  { key:'wood',   title:'Mộc/木, Thảo/艸 (cây/cỏ)',   members:[75,140] },
  { key:'speech', title:'Ngôn/言, 讠 (lời nói)',      members:[149] },
  { key:'walk',   title:'Hành/行, Sước/辶, Xích/彳',  members:[144,162,60] },
  { key:'animal', title:'Khuyển/犬/犭, Trùng/虫',     members:[94,142] },
  { key:'metal',  title:'Kim/金 (kim loại, tiền tệ)', members:[167] },
  { key:'food',   title:'Thực/食/饣 (ăn uống)',       members:[184] },
  { key:'silk',   title:'Mịch/糸/纟 (tơ, dệt)',       members:[120] },
  { key:'gate',   title:'Môn/門/门 (cửa)',            members:[169] },
  { key:'cart',   title:'Xa/車/车 (xe cộ)',           members:[159] },
  { key:'roof',   title:'Miên/宀 (mái nhà)',          members:[40] },
  { key:'mouth',  title:'Khẩu/口 (miệng, ngôn ngữ)',  members:[30] }
];
function inFamily(r, fam){
  if(fam.members.includes(r.no)) return true;
  const vset = new Set(r.variants||[]);
  if(fam.key==='water' && (vset.has('氵')||vset.has('氺'))) return true;
  if(fam.key==='hand'  && (vset.has('扌')||vset.has('龵'))) return true;
  if(fam.key==='heart' && (vset.has('忄')||vset.has('⺗'))) return true;
  if(fam.key==='speech'&& vset.has('讠')) return true;
  if(fam.key==='walk'  && vset.has('辶')) return true;
  if(fam.key==='animal'&& vset.has('犭')) return true;
  if(fam.key==='silk'  && vset.has('纟')) return true;
  if(fam.key==='gate'  && (r.char==='門' || vset.has('门'))) return true;
  if(fam.key==='cart'  && (r.char==='車' || vset.has('车'))) return true;
  if(fam.key==='food'  && vset.has('饣')) return true;
  if(fam.key==='wood'  && (r.no===75 || vset.has('艹'))) return true;
  return false;
}

function render(){
  const term = (q.value || '').trim().toLowerCase();
  const items = data.filter(r => {
    const t = `${r.char} ${r.pinyin||''} ${r.name_vi||''} ${r.meaning_vi||''}`.toLowerCase();
    return !term || t.includes(term);
  });
  if(viewMode==='flat'){
    grid.innerHTML = items.map(r => card(r)).join('');
  } else if(viewMode==='strokes'){
    const byStroke = {};
    for(const r of items){ const s = strokesByNo(r.no); if(!s) continue; (byStroke[s] ||= []).push(r); }
    grid.innerHTML = Object.keys(byStroke).sort((a,b)=>+a-+b).map(s=>{
      const body = (byStroke[s]||[]).map(r=>card(r)).join('');
      return `<section class="group"><h2>Nhóm ${s} nét <span class="badge-strokes">${s} nét</span></h2><div class="grid">${body}</div></section>`;
    }).join('');
  } else if(viewMode==='family'){
    const sections = families.map(f=>{
      const arr = items.filter(r=>inFamily(r,f));
      if(!arr.length) return '';
      const body = arr.map(r=>card(r)).join('');
      return `<section class="group"><h2>${f.title} <span class="badge-family">${f.key}</span></h2><div class="grid">${body}</div></section>`;
    }).filter(Boolean).join('');
    grid.innerHTML = sections || '<div style="padding:16px;color:#64748b">Không có thẻ trong nhóm hiện tại.</div>';
  }
  initPads();
}

function artPath(r){ const fname = `${String(r.no).padStart(3,'0')}_${r.char}.svg`; return `images/${fname}`; }
function displayChar(r){ if(!useSimplified || !r.variants || !r.variants.length) return r.char; return r.variants[0]; }
function card(r){
  const cid = `pad_${String(r.no).padStart(3,'0')}`;
  const glyph = displayChar(r);
  const bodyFront = `
    <div class="art"><img src="${artPath(r)}" alt="${glyph} minh hoạ" loading="lazy" style="width:100%;height:100%;object-fit:cover"/></div>
    <div class="meta">
      <div class="line1">
        <span class="hanzi" style="font-size:18px">${glyph} · <span class="pinyin">${r.pinyin||''}</span></span>
        <span class="badge">#${String(r.no).padStart(3,'0')}</span>
      </div>
      <div class="kicker">${r.name_vi||''}</div>
      <div class="vimean">${r.meaning_vi||''}</div>
      <div style="margin-top:8px;display:flex;gap:8px">
        <button class="speaker" onclick="${audioMode==='pinyin' ? `speakPinyin('${r.pinyin||''}')` : `speakHanzi('${r.char}')`}">🔊</button>
      </div>
    </div>`;
  const bodyBack = `
    <div class="meta">
      ${r.examples && r.examples.length ? `<div class="examples" style="color:#475569">Ví dụ: ${r.examples.map(e=>`${e.hanzi} (${e.pinyin}) – ${e.vi}`).join('; ')}</div>` : '<div class="examples" style="color:#94a3b8">(Chưa có ví dụ)</div>'}
    </div>
    <div class="pad">
      <div class="pad-head">
        <div class="title">✏️ Ghi tay theo bộ: <strong>${glyph}</strong></div>
        <div class="actions"><button class="primary" onclick="clearPad('${cid}', '${glyph}')">Xoá nét</button></div>
      </div>
      <canvas id="${cid}" aria-label="Vẽ luyện bộ ${glyph}"></canvas>
    </div>`;
  return `
  <article class="card ${flipMode?'flip':''}" role="listitem" tabindex="0" aria-label="${glyph} ${r.pinyin}" onclick="this.classList.toggle('flip')">
    <div class="flip-inner">
      <div class="face front">${bodyFront}</div>
      <div class="face back">${bodyBack}</div>
    </div>
  </article>`;
}

q.addEventListener('input', render);
printBtn.addEventListener('click', () => window.print());
audioSelect.addEventListener('change', e=>{ audioMode = e.target.value; render(); });
flipToggle.addEventListener('change', e=>{ flipMode = !!e.target.checked; render(); });
simpToggle.addEventListener('change', e=>{ useSimplified = !!e.target.checked; render(); });

// ===== handwriting pad logic =====
function initPads(){ document.querySelectorAll('.pad canvas').forEach(can=>setupPad(can.id, can)); }
let drawing = {};
function setupPad(id, canvas){
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  drawGrid(canvas, ctx);
  const el = canvas.closest('.card');
  const ch = el.querySelector('.hanzi').textContent.trim().split('·')[0].trim();
  drawGhost(canvas, ctx, ch);
  attachDrawing(canvas);
}
function drawGrid(canvas, ctx){
  const w = canvas.clientWidth, h = canvas.clientHeight;
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
  const step = 20; for(let x=step; x<w; x+=step){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
  for(let y=step; y<h; y+=step){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
  ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(w/2,0); ctx.lineTo(w/2,h); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,h/2); ctx.lineTo(w,h/2); ctx.stroke();
}
function drawGhost(canvas, ctx, ch){
  const w = canvas.clientWidth, h = canvas.clientHeight;
  ctx.save(); ctx.globalAlpha = 0.08; ctx.fillStyle = '#000';
  ctx.font = '120px \'Noto Sans SC\', \'Microsoft YaHei\', \'PingFang SC\', \'SimHei\', sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(ch, w/2, h/2 + 10); ctx.restore();
}
function attachDrawing(canvas){
  const ctx = canvas.getContext('2d');
  const start = (x,y)=>{ drawing[canvas.id]=true; ctx.beginPath(); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#111827'; ctx.lineWidth=3; ctx.moveTo(x,y); };
  const move = (x,y)=>{ if(!drawing[canvas.id]) return; ctx.lineTo(x,y); ctx.stroke(); };
  const stop = ()=>{ drawing[canvas.id]=false; };
  canvas.addEventListener('pointerdown', e=>{ const r=canvas.getBoundingClientRect(); start(e.clientX-r.left, e.clientY-r.top); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e=>{ const r=canvas.getBoundingClientRect(); move(e.clientX-r.left, e.clientY-r.top); });
  canvas.addEventListener('pointerup', stop);
  canvas.addEventListener('pointerleave', stop);
}
function clearPad(id, ch){ const canvas = document.getElementById(id); if(!canvas) return; const ctx = canvas.getContext('2d'); drawGrid(canvas, ctx); drawGhost(canvas, ctx, ch); }

// ===== audio (Web Speech API) =====
function normalizePinyin(p){ if(!p) return ''; const map = {'ā':'a','á':'a','ǎ':'a','à':'a','ē':'e','é':'e','ě':'e','è':'e','ī':'i','í':'i','ǐ':'i','ì':'i','ō':'o','ó':'o','ǒ':'o','ò':'o','ū':'u','ú':'u','ǔ':'u','ù':'u','ǖ':'ü','ǘ':'ü','ǚ':'ü','ǜ':'ü'}; return p.split('').map(ch=>map[ch]||ch).join(''); }
function speak(text, lang){ if(!('speechSynthesis' in window)) { alert('Trình duyệt không hỗ trợ đọc âm thanh'); return; } const u = new SpeechSynthesisUtterance(text); u.lang = lang || 'en-US'; const tryVoices = ()=>{ const voices = speechSynthesis.getVoices(); if(lang && voices && voices.length){ const v = voices.find(v=>v.lang && v.lang.toLowerCase().startsWith(lang.toLowerCase())); if(v) u.voice = v; } speechSynthesis.cancel(); speechSynthesis.speak(u); }; if(speechSynthesis.getVoices().length) tryVoices(); else speechSynthesis.onvoiceschanged = tryVoices; }
function speakPinyin(p){ const t = normalizePinyin(p); speak(t, 'en-US'); }
function speakHanzi(h){ speak(h, 'zh-CN'); }
