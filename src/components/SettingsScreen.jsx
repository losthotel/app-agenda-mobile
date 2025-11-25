// src/components/menu (components)/SettingsScreen.jsx
import { useStore } from "@/lib/store";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sun, Volume2, Clock, User, Bell } from "lucide-react";
import generatedImage from '@assets/generated_images/user_profile_avatar.png';
import { useEffect } from "react";

export default function SettingsScreen() {
  const { settings, updateSettings } = useStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (settings.theme === "colorful") {
      root.classList.add("light");
    } else {
      root.classList.add(settings.theme);
    }
  }, [settings.theme]);

  return (
    <div className="min-h-screen bg-background pb-24 px-6 pt-8">
      <h1 className="text-2xl font-bold mb-6">Ajustes</h1>
      <div className="space-y-8">
        {/* Perfil */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={settings.avatarUrl || generatedImage} alt="Perfil" className="w-16 h-16 rounded-full object-cover border-2 border-muted" />
              <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full shadow-md">
                <User size={12} />
              </Button>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Nome de exibição</Label>
              <Input value={settings.username} onChange={(e) => updateSettings({ username: e.target.value })} className="mt-1" />
            </div>
          </div>
        </section>

        {/* Preferências */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preferências</h3>
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Sun size={18} /></div>
              <div><Label className="text-base">Tema</Label><p className="text-xs text-muted-foreground">Aparência do app</p></div>
            </div>
            <Select value={settings.theme} onValueChange={(val) => updateSettings({ theme: val })}>
              <SelectTrigger className="w-[110px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="colorful">Colorido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-card border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Clock size={18} /></div>
              <div><Label className="text-base">Horário Padrão</Label><p className="text-xs text-muted-foreground">Para novas tarefas</p></div>
            </div>
            <Input type="time" className="w-24 h-9" value={settings.defaultTime} onChange={(e) => updateSettings({ defaultTime: e.target.value })} />
          </div>
        </section>

        {/* Notificações */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notificações</h3>
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Bell size={18} /></div>
              <div><Label className="text-base">Notificações</Label><p className="text-xs text-muted-foreground">Alertas de tarefas</p></div>
            </div>
            <Switch checked={settings.notificationsEnabled} onCheckedChange={(c) => updateSettings({ notificationsEnabled: c })} />
          </div>
        </section>

        {/* Backup */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Dados</h3>
          <div className="p-4 rounded-xl bg-card border shadow-sm">
            <Button variant="outline" className="w-full" onClick={() => alert("Backup realizado!")}>
              Fazer Backup Agora
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}