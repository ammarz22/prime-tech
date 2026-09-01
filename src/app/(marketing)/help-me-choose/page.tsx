import { HelpMeChooseWizard } from "@/components/common/help-me-choose-wizard";
import { getEffectiveContact } from "@/lib/db/site-settings";

export default async function HelpMeChoosePage() {
  const contact = await getEffectiveContact();
  return <HelpMeChooseWizard whatsappNumber={contact.whatsappNumber} />;
}
