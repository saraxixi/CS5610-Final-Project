import { Router } from 'express';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', 'uploads')); // 注意: 实际上传在 public/uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// Create (register user)
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('savedArtifacts');
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'Not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// post user favorites
router.post('/:id/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const artifactId = req.body.artifactId;
    if (!user.savedArtifacts.includes(artifactId)) {
      user.savedArtifacts.push(artifactId);
      await user.save();
    }

    res.json({ message: 'Artifact saved to favorites!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE all favorites for a user
router.delete('/:id/favorites/all', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log("Deleting all favorites for:", user?.email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.savedArtifacts = [];
    await user.save();

    console.log("Favorites after clear:", user.savedArtifacts);
    res.json({ message: 'All favorites removed after checkout' });
  } catch (err) {
    console.error("ERROR in DELETE /favorites/all:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user favorites
router.delete('/:id/favorites/:artifactId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.savedArtifacts = user.savedArtifacts.filter(
      (artifactId) => artifactId.toString() !== req.params.artifactId
    );
    await user.save();

    res.json({ message: 'Artifact removed from favorites!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user favorites
router.get('/:id/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('savedArtifacts');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.savedArtifacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// upload avatar
router.post('/:id/avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const avatarPath = `/uploads/${req.file.filename}`; // 前端可通过该路径访问
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { avatar: avatarPath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Avatar updated!', avatar: avatarPath });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;