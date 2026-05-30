/**
 * Maps productId → [complementary productId, ...]
 * Used by CompleteTheLook component on product pages.
 */
export const looks: Record<string, string[]> = {
  // Cloud Runner (men) + Stealth Hoodie + Jogger Pant
  "1": ["36", "27"],
  // Cloud Runner (women) + Breeze Slip-On vibe: Windbreaker + Block Tee
  "2": ["44", "41"],
  // Trail Pacer + Lightweight Jacket + Jogger Pant
  "3": ["29", "27"],
  // Breeze Slip-On + Pullover Hoodie + Knit Shorts
  "4": ["25", "109"],
  // Dash Sport + Block Tee + Cargo Jogger
  "9": ["41", "37"],
  // Edge Runner Pro + Stealth Hoodie + Track Pant
  "43": ["36", "105"],
  // Stealth Hoodie + Cloud Runner + Jogger Pant
  "36": ["1", "27"],
  // Lightweight Jacket + Edge Runner Pro + Track Pant
  "29": ["43", "105"],
  // Street Runner X + Raw Tee + Cargo Jogger
  "35": ["46", "37"],
};
