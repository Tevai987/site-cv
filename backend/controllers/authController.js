import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Inscription d'un nouvel utilisateur
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const nameRegex = /^[a-zA-ZÀ-ÿ\s-]+$/; // Regex pour valider le nom (lettres et espaces uniquement)

    if (!nameRegex.test(name)) {
      return res.status(400).json({
        message: "Le nom ne doit contenir que des lettres et des espaces.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const adminExists = await User.findOne({ isAdmin: true });

    const isAdmin = !adminExists;

    const isActive = isAdmin ? true : false;

    const user = new User({
      name,
      email,
      password,
      isAdmin,
      isActive,
      createdAt: Date.now(),
    });

    await user.save();

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },

      message: isActive
        ? "Inscription réussie. Vous êtes connecté en tant qu'administrateur."
        : "Inscription réussie. Votre compte est en attente d'activation par un administrateur.",
    });
  } catch (err) {
    return res.status(500).json({ message: "Erreur Serveur", err });
  }
};

// Connexion d'un utilisateur existant

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    if (!user.isActive) {
      return res.status(400).json({
        message:
          "Votre compte est en attente d'activation par un administrateur.",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
      },
      process.env.JWT,
      { expiresIn: "1h" }, // la connexion expire après 1 heure
    );

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
    };

    res.status(200).json({ user: safeUser, token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur Serveur dans le login", err });
  }
};

// Mettre à jour la donnée d'un utilisateur

export const updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    /*res.status(200).json({message: 'Utilisateur mis à jour avec succès', user: updateUser});*/

    // On n'affiche pas le mot de passe dans la réponse et le rôle de l'utilisateur pour des raisons de sécurité

    const safeUser = {
      id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    };

    return res
      .status(200)
      .json({ message: "Utilisateur mis à jour avec succès", user: safeUser });
  } catch (err) {
    return res.status(500).json({ message: "Erreur Serveur", err });
  }
};
