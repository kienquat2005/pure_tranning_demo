export class CollisionDetector {
    static detectCollision(object1, object2) {
        // Lấy thông tin về vị trí và kích thước của hai vật thể
        const bounds1 = object1.getBounds();
        const bounds2 = object2.getBounds();
      
        // Kiểm tra xem hai hình chữ nhật đại diện cho hai vật thể có chồng lên nhau hay không
        return bounds1.x + bounds1.width > bounds2.x &&
               bounds1.x < bounds2.x + bounds2.width &&
               bounds1.y + bounds1.height > bounds2.y &&
               bounds1.y < bounds2.y + bounds2.height;
      }
      
}