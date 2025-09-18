import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },      // Bengali
  { code: "ta", label: "தமிழ்" },      // Tamil
  { code: "te", label: "తెలుగు" },     // Telugu
  { code: "gu", label: "ગુજરાતી" },    // Gujarati
  { code: "mr", label: "मराठी" },    // Marathi
  { code: "pa", label: "ਪੰਜਾਬੀ" },    // Punjabi
];

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.text}>
          {languages.find((l) => l.code === currentLang)?.label ||
            "Select Language"}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Language</Text>
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeLanguage(item.code)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.code === currentLang && styles.selectedText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 6,
    alignItems: "center",
  },
  closeText: {
    color: "#333",
    fontWeight: "600",
  },
});
