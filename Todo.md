cd web

python .\RandomForest.py

Sử dụng Kong APi Gateway sau đó sẽ deploy lên azure = k8s, chứ ko sử dụng azure api gateway

**Nguyên:**

+ Tạo các page sau: Login, register với khi admin và user đăng nhập vào thì sẽ được chuyển trên trang khác nhau
  + Admin thì trỏ đến trang admin
  + User thì trỏ đến trang user
 
  + => **Sử dụng js**
+ Trước hết cứ code trực tiếp ko cần dùng jwt

**Nghĩa:**

+ Authenticate + Authorize cho thằng admin và user trước (Trước hết cứ dùng postman để gọi đã khi nào nguyên dev xong r test trên code Nguyên)

**Lập:**

+ Train model ML/DL sau đó tích hợp mô hình vào web
+ Deploy kong api gateway lên azure

**Công việc sau cùng:**

Block khi phát hiện tấn công web
