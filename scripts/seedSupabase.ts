import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { users, sellerProfiles, initialProducts as products, initialOrders as orders } from '../src/data/mockData';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables in .env');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Seeding Database...');

  // 1. Seed Users
  console.log('Seeding Users...');
  const usersToInsert = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    avatar: u.avatar || '',
    default_workspace: u.defaultWorkspace,
  }));
  const { error: userErr } = await supabase.from('users').upsert(usersToInsert);
  if (userErr) console.error('User Seed Error:', userErr);

  // 2. Seed Seller Profiles
  console.log('Seeding Sellers...');
  const sellersToInsert = sellerProfiles.map(s => ({
    seller_id: s.sellerId,
    shop_name: s.shopName,
    shop_description: s.shopDescription,
    banner_url: s.bannerUrl,
    logo_url: s.logoUrl,
    gst_number: s.gstNumber,
    status: s.status,
    total_sales: s.totalSales,
  }));
  const { error: sellerErr } = await supabase.from('seller_profiles').upsert(sellersToInsert);
  if (sellerErr) console.error('Seller Seed Error:', sellerErr);

  // 3. Seed Products
  console.log('Seeding Products...');
  const productsToInsert = products.map(p => ({
    id: p.id,
    seller_id: p.sellerId,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    price: p.price,
    compare_price: p.comparePrice,
    stock: p.stock,
    sku: p.sku,
    images: p.images,
    description: p.description,
    status: p.status,
    rating: p.rating,
  }));
  const { error: productErr } = await supabase.from('products').upsert(productsToInsert);
  if (productErr) console.error('Product Seed Error:', productErr);

  // 4. Seed Orders
  console.log('Seeding Orders...');
  const ordersToInsert = orders.map(o => ({
    id: o.id,
    customer_id: o.customerId,
    seller_id: o.sellerId,
    items: o.items,
    total: o.total,
    status: o.status,
    shipping_address: o.shippingAddress,
  }));
  const { error: orderErr } = await supabase.from('orders').upsert(ordersToInsert);
  if (orderErr) console.error('Order Seed Error:', orderErr);

  console.log('Seeding Complete!');
}

seed().catch(console.error);
